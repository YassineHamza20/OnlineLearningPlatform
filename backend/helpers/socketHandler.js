const mysql = require('../helpers/Sql_connection');
const authenticateSocket = require('../middleware/authenticateSocket')

const socketHandler = (io) => {
    io.use((socket, next) => {
        authenticateSocket(socket, next)
    });

    io.on('connection', (socket) => {
        console.log('A user connected');

        
        socket.on('createRoom', (roomId) => {
            console.log("joined Room ", roomId);
            socket.join(roomId) 
        })        
        
        //handling the real time tutor notification when learner books lesson
        socket.on('notification', (data) => {
            console.log("incoming notification data", data);
            console.log("emitting notification now ", data.tutor_id);
            io.to(data.tutor_id).emit('Notification incoming', { notification: data});
        })

        socket.on('cancelLesson', (data) => {
            console.log("removing lesson", data)
            console.log("start_time: ", data.start_time)

            //getting date in this format for example "May 25, 2024" 
            //converting it to this format year-month-day

            // Convert input date string to Date object
            const date = new Date(data.start_time);

            // Extract date components
            const year = date.getFullYear();
            // Month starts from 0, so add 1 to get the correct month
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');

            // Construct the formatted date string in ISO format
            const formattedDate = `${year}-${month}-${day}T00:00:00.000Z`;

            const query = `SELECT *
            FROM private_lesson t1
            WHERE start_time = (
                SELECT MIN(start_time)
                FROM private_lesson t2
                WHERE DATE(t2.start_time) = DATE(t1.start_time)
                AND t2.start_time >= NOW()
                AND t2.Accepted <> 0 
                AND Date(t2.start_time) = Date(?)
                AND t2.private_learner_id = ?
            )
            And t1.accepted <>0`
            mysql.query(query, [formattedDate, data.learnerId], (err, result) => {
                if(err) {
                    console.log(err)
                    io.to(data.learnerId).emit('CancelLesson Error', { removedLesson: "Internal Server Error"});
                }else {
                    console.log("result: ", result)
                    const queryy = ` SELECT pl.*, t.pfp, t.firstname, t.lastname, t.isConnected
                    FROM private_lesson AS pl, tutor AS t
                    WHERE pl.tutor_id = t.id
                    and lesson_id = ?`
                    mysql.query(queryy, [data.lesson], (notificationError, notificationResult) => {
                        if (notificationError) {
                            console.log(notificationError)
                            io.to(data.learnerId).emit('CancelLesson Error', { removedLesson: "Internal Server Error"});
                        }else {
                            const queryy = `SELECT Count(ReadByLearner) as length
                            from private_lesson
                            where private_learner_id = ? and readByLearner = 0;` 
                            mysql.query(queryy, [data.learnerId], (unreadErr, unreadResult) =>{
                                if(err) {
                                    console.log(unreadErr)
                                    io.to(data.learnerId).emit('ApproveLesson Error', { removedLesson: "Internal Server Error"});
                                }else {
                                    io.to(data.learnerId).emit('Cancel Notification', { removedLesson: data.lesson, firstLesson: result[0], ReadByLearner: unreadResult[0].length, lesson: notificationResult[0]})
                                }
                            })
                        }
                    })
                }
            })
        })

        socket.on('approveLesson', (data) => {
            console.log("approve lesson", data)
            const query = ` SELECT pl.*, t.pfp, t.firstname, t.lastname, t.isConnected
            FROM private_lesson AS pl, tutor AS t
            WHERE pl.tutor_id = t.id
            and lesson_id = ?`
            mysql.query(query, [data.lesson], (err, result )=> {
                if (err) {
                    console.log(err)
                    io.to(data.learnerId).emit('ApproveLesson Error', { removedLesson: "Internal Server Error"});
                }else {
                    const queryy = `SELECT Count(ReadByLearner) as length
                    from private_lesson
                    where private_learner_id = ? and readByLearner = 0;` 
                    mysql.query(queryy, [data.learnerId], (unreadErr, unreadResult) =>{
                        if(err) {
                            console.log(unreadErr)
                            io.to(data.learnerId).emit('ApproveLesson Error', { removedLesson: "Internal Server Error"});
                        }else {
                            io.to(data.learnerId).emit('Approvement Notification', { approvedLesson: data.lesson, ReadByLearner: unreadResult[0].length, lesson: result[0]});

                        }
                    })
                }
            })

        })

        socket.on("send_message", (data) => {
            let query 
            if(data.Sender === "Learner"){
                query = "select id from tutor where uuid = ?"
            }
            else {
                query = "select id from learner where uuid = ?"
            }
            console.log("MESSAGE", query)
            mysql.query(query, [data.friendUuid], (err, result) => {
                if(err) {
                console.log(err)
             }else {
                console.log("RESULTAT", result[0])
               const friendId = result[0].id
               const message = {
               TextID: data.TextId, 
                id: result[0].id,
                Sender: data.Sender,
                message: data.message,
                MessageTime: data.MessageTime,
                IdLearner: data.Sender === "Learner"? data.myId : result[0].id,
                IdTutor : data.Sender === "Tutor" ? data.myId : result[0].id,
                lastname: data.lastname,
                firstname: data.firstname,
                pfp: data.pfp,
                uuid: data.friendUuid,
                otherUuid: data.otherUuid
             }
             socket.to(friendId).emit("recieve_message", message);
             }
             })
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};

module.exports = socketHandler;
