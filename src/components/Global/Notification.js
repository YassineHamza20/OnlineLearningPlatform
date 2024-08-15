import { IoCheckmarkCircle } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import { fetchFile, isGoogleProfilePicture, timeFormatter } from "./functions"
import { useEffect, useState } from "react"
import ElapsedTime from "./ElapsedTime";
import { handleLessonDifficultyColor } from "./functions";
import { decrementUnreadNotifications, updateNotification } from "../../state/slices/NotificationSlice";
import { useDispatch } from 'react-redux'
import { updateNotificationRead } from "../../state/slices/NotificationSlice";
import axiosInstance from "../../interceptors/axiosInterceptor"
import io from 'socket.io-client'
import { removeCurrentDayLessons, replaceFirstLesson, updateCurrentDayLessons } from "../../state/slices/lessonsList";

function Notification(props) {
    
    //holding the picture
    const [imageUrl, setImageUrl] = useState(null);
    const dispatch = useDispatch()


    // Format the date to display as "Month Day, Year"
    const handleTimeFormat = () => {
        const date = new Date(props.notification.start_time);

        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options)

        return formattedDate
    }

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                let imageUrl = props.notification.pfp;
                if (!isGoogleProfilePicture(props.notification.pfp)) {
                    imageUrl = await fetchFile(props.notification.pfp, 'images', 'Learner', props.notification.private_learner_id);
                }
                setImageUrl(imageUrl);
            } catch (err) {
                console.log(err);
                setImageUrl(null);
            }
        };
    
        fetchImageUrl();
    }, [])

    //make api call to confirm or reject lesson
    const notificationFeedBack = async (accepted, eventName) => {
        return new Promise((resolve, reject) => {
            axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/tutor/NotificationFeedback`, {
                lessonId: props.notification.lesson_id,
                accepted: accepted
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                }
            })
            .then((response) => {
                console.log("response from NotificationFeedBack: ", response.data.message)
                //sending notification to learner
                const socket = io(`${process.env.REACT_APP_SERVER_URL}`, {
                auth: {
                    token: localStorage.getItem('accesstoken')
                }
                })

                console.log("start_time:", props.notification.start_time, " formatted start_time: ", handleTimeFormat());
                console.log("eventName :", eventName, "Condition for accepted: ", eventName==="approveLesson", "Condition for rejected: ", eventName=== "cancelLesson");
                socket.emit(eventName, {
                    lesson: props.notification.lesson_id,
                    learnerId: props.notification.private_learner_id, 
                    start_time: handleTimeFormat(),
                    isSeenByLearner: props.notification.ReadByLearner
                })
                resolve("Accepted")
            })
            .catch((err) => {
                console.log(err)
                reject("Operation Error!")
            })
        })
    }
 
    //upon the acceptance of the lesson, we send the learner and the tutor emails containing the videoCall link
    const handleSendEmailAfterAcceptance = async(uuid, learnerId, topic, date) => {
        return new Promise((resolve, reject) => {
            axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/tutor/sendVideoCallLink`, {
                lesson_uuid: uuid,
                learner_id: learnerId,
                lesson_topic: topic,
                lesson_date: date
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                }
            })
            .then((result) => {

                resolve("Email sent")
            })
            .catch((err) => {
                reject("Email Not sent ")
            })
        })
    }

    const handleAcceptLesson = async () => {
        console.log("AcceptedClickeeed");
        try {
            const result = await notificationFeedBack(1, 'approveLesson')

            
            dispatch(updateNotification({ notification: props.notification.lesson_id, accepted: 1, role: "tutor", lesson:"", type:""}))
            
            dispatch(replaceFirstLesson(props.notification))
            
            dispatch(updateCurrentDayLessons(props.notification.lesson_id))
            
            const emailApiResult = await  handleSendEmailAfterAcceptance(props.notification.uuid, props.notification.private_learner_id, props.notification.lesson_topic, props.notification.start_time)
            
            console.log(emailApiResult);
            console.log(result);
        }catch(err) {
            console.log(err)
        }
    }
    
    const handleRejectLesson = async () => {
        try{
            const result = await notificationFeedBack(0, 'cancelLesson')

            dispatch(updateNotification({ notification: props.notification.lesson_id, accepted: 0, role: "tutor", lesson:"", type:"approve"}))
            dispatch(removeCurrentDayLessons(props.notification.lesson_id))
            console.log(result);
        }catch(err) {
            console.log(err)
        }
    }
    
    const handleNotificationClick = async () => {
        console.log("read: ", props.notification.ReadByTutor);
        //if the notification is unread we make it change it to read in the database
        if (!props.notification.ReadByTutor) {
            //Marking the notification as read 
            try {
                const response = await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/tutor/markAsRead`, {
                    notificationId: props.notification.lesson_id,
                    notificationType: 'private Lesson'
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                    }
                })
                console.log(response.data.message);
                dispatch(updateNotificationRead({ notification: props.notification, read: 1, role: "tutor"}))
                //decrementing how many unread notifications we have 
                dispatch(decrementUnreadNotifications())
            }catch(err) {
                console.log(err)
            }
        }

    }

    return (
         <div onClick={handleNotificationClick} className={` ${!props.notification.ReadByTutor? "bg-lightButton2" : ""} flex p-2 relative space-x-2 hover:bg-backg rounded-t-lg items-center py-4 border-b`}>
            {
                imageUrl? 
                <img 
                alt="pfp" 
                src={imageUrl}
                referrerPolicy="no-referrer"
                className="min-w-16 self-start max-w-16 max-h-16 rounded-full min-h-16 object-cover"></img>
                : 
                <div className="min-w-16 animate-pulse bg-darkg max-w-16 max-h-16 rounded-full self-start min-h-16 object-cover">
                </div>
            }
            <div className="flex flex-col self-start space-y-1">
                <div className="text-sm">
                    {
                        props.notification.Accepted === -1? 
                        <span className="text-darkg"><span className="font-semibold text-black">{props.notification.firstname+" "+props.notification.lastname}</span> wants to book <span className="font-bold text-elements">{props.notification.lesson_topic}</span> lesson with you <span className="">from</span> <span className="text-black font-bold">{timeFormatter(props.notification.start_time)}</span> to <span className="font-bold text-black">{timeFormatter(props.notification.end_time)}</span> on <span className="text-black font-semibold">{handleTimeFormat()}.</span></span>
                        :
                        (props.notification.Accepted ===1?
                        <span className="text-darkg"> 
                            <span>You have <span className="font-bold text-elements">{props.notification.lesson_topic}</span> lesson with </span>
                            <span className="font-semibold text-black">{props.notification.firstname+" "+props.notification.lastname}</span>
                            <span className=""> from </span>
                            <span className="font-semibold text-black">{timeFormatter(props.notification.start_time)}</span>
                            <span className=""> to </span>
                            <span className="font-semibold text-black">{timeFormatter(props.notification.end_time)}</span>
                            <span className=""> on </span>
                            <span className="font-semibold text-black">{handleTimeFormat()}.</span>
                        </span>
                        :
                        <span className="text-darkg"> 
                            <span>You <span className="text-errortext font-bold">rejected</span> <span className="font-bold text-elements">{props.notification.lesson_topic}</span> lesson with </span>
                            <span className="font-semibold text-black">{props.notification.firstname+" "+props.notification.lastname}</span>
                            <span className=""> from </span>
                            <span className="font-semibold text-black">{timeFormatter(props.notification.start_time)}</span>
                            <span className=""> to </span>
                            <span className="font-semibold text-black">{timeFormatter(props.notification.end_time)}</span>
                            <span className=""> on </span>
                            <span className="font-semibold text-black">{handleTimeFormat()}.</span>
                        </span>)
                    }
                </div>
                <div className="flex space-x-2">
                    <div className={`text-button bg-lightbutton text-xs p-1 border border-button rounded-xl`}>
                        {props.notification.language}
                    </div>
                    <div className={`${handleLessonDifficultyColor(props.notification.lesson_difficulty, 'other')} text-xs p-1 border rounded-xl`}>
                        {props.notification.lesson_difficulty}
                    </div>
                </div>
                <span className={`text-button2 text-xs ${props.notification.ReadByTutor? "font-normal": "font-bold"}`}>
                    Booked {ElapsedTime(props.notification.scheduling_date)}
                </span>
            </div>
            {
                props.notification.Accepted === -1?
                <>
                    <div className="flex z-50 items-center self-start space-x-1">
                        <IoCheckmarkCircle onClick={(e) => {
                            e.stopPropagation(); // Stop event propagation
                            handleNotificationClick()
                            handleAcceptLesson();
                        }} className="text-elements cursor-pointer" size="25"></IoCheckmarkCircle>
                        <IoCloseCircle onClick={(e) => {
                            e.stopPropagation(); // Stop event propagation
                            handleNotificationClick()
                            handleRejectLesson();
                        }} className="text-errortext cursor-pointer" size="25"></IoCloseCircle>
                    </div>
                </>
                :
                null
            }
            {
                !props.notification.ReadByTutor? 
                <div className="min-w-3 min-h-3 bg-button2 rounded-full absolute top-1/2 right-1 transform -translate-y-1/2"></div>
                :
                null
            }
        </div> 
    );
}

export default Notification;