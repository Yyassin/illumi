const dotenv = require('dotenv');
const io = require('socket.io')
dotenv.config({path: './config.env'});
const chat_port = parseInt(process.env.CHAT_PORT) || 4000;
const server = io.listen(chat_port)

const controller = require('./controller')

console.log(`Socket listening on port ${chat_port}`);

server.on("connection", socket => {
    const { id } = socket.client;
    console.log('user connected')

    socket.on("chat message", async (msgInput) => {
        const msg = await controller.addMessage(msgInput)
        server.emit("chat message", msg)
    })
})