const dotenv = require('dotenv');
const io = require('socket.io')
dotenv.config({path: './config.env'});
const chat_port = parseInt(process.env.CHAT_PORT) || 4000;
const server = io.listen(chat_port)

const controller = require('./controller')

console.log(`Socket listening on port ${chat_port}`);

server.on("connection", socket => {
    const { id } = socket.client;

    socket.on('forceDisconnect', () => {
        socket.client.close();
        socket.client.close(true);
    })

    socket.on('mouse', (data) => {
        socket.broadcast.emit('mouse2', data)
    })

    socket.on('friendMouseup', () => {
        socket.broadcast.emit('friendMouseup')
    })

    socket.on("chat message", async (msgInput, idMes) => {
        const msg = await controller.addMessage(msgInput)
        
        if(msg) {
            server.emit("chat message", msg)
            server.emit("chat noti", msg)
        } else {
            server.to(id).emit('invalid token')
        }
    })

})

module.exports = server;