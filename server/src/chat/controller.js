const Message = require('../models/message.model')
const User = require('../models/user.model')

exports.addMessage = async (msgInput) => {
    const today = new Date()
                // 2020-06-02 14:14
    const date = today.getFullYear() + '-' 
                + (today.getMonth()+1) + '-' 
                + today.getDate() + ' ' 
                + today.getHours() + ':'
                + today.getMinutes() 

    let message = new Message({
        roomID: msgInput.roomID,
        userID: msgInput.userID,
        content: msgInput.content,
        date: date,
    })

    message.save()

    try {
        const user = await User.findById(msgInput.userID)

        return {
            content: msgInput.content,
            date: date,
            user: {
                email: user.email,
                name: user.name,
                thumbnail: user.thumbnail
            }
        }
    } catch(error) {
        return error.message
    }  
}

/*
message {
    content
    date
    user{
        email
        name
        thumbnail
    }
}
*/