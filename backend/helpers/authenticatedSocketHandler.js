const mysql = require('../helpers/Sql_connection');
const authenticateSocket = require('../middleware/authenticateSocket')


const authenticatedSocketHandler = (io) => {
    //verify if the user is authenticated or not
    io.use((socket, next) => {
        authenticateSocket(socket, next);
    })


    io.on('authenticated_connection', (socket) => {
        console.log('New Authenticated Client Connected')

        socket.on('notification', (data) => {
            console.log("text: ", data.text);
        })
        
        socket.on('disconnect', () => {
            console.log('Client disconnected');
          });

    })
}
module.exports= authenticatedSocketHandler