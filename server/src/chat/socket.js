const dotenv = require('dotenv');
const io = require('socket.io')
dotenv.config({path: './config.env'});
const chat_port = parseInt(process.env.CHAT_PORT) || 4000;
const server = io.listen(chat_port)

const controller = require('./controller')

console.log(`Socket listening on port ${chat_port}`);

server.on("connection", socket => {
    const { id } = socket.client;
    //console.log('user connected: ' + id)

    socket.on("chat message", async (msgInput, idMes) => {
        const msg = await controller.addMessage(msgInput)
        
        if(msg) {
            server.emit("chat message", msg)
            server.emit("chat noti", msg)
        } else {
            console.log(server.clients)
            server.to(id).emit('invalid token')
        }
    })
})