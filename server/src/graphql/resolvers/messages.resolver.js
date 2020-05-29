const Room = require('../../models/room.model')
const Message = require('../../models/message.model')

module.exports = {
    createRoom: async({name}) => {
        try {
    
            const room = new Room({
                name: name
            })
 
            await room.save()
            return {
                id: room.id,
                name: room.name,
                role_filter: []
            }    
        } catch (error) {
            throw new Error("Internal Server Error")

        }
    },

    createMessage: async({content, userId, roomId}) => {
        try {
    
            const message = new Message({
                content: content,
                userId: userId,
                roomId: roomId,
                date: Date.now()
            })
 
            await message.save()
            return {
                id: message.id,
                content: message.content,
                userId: message.userId,
                roomId: message.roomId,
                date: message.date
            }    
        } catch (error) {
            console.log(error.message)
            throw new Error("Internal Server Error")

        }
    },

    messages: async (userId) => {
        try {
            const messages = await Message.find({userId});
            console.log(messages)
            return messages
        } catch(err) {
            throw err;
        }
    },

    
}