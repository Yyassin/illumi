const keys = require("../../config/keys")
const jwt = require("jsonwebtoken")

const Message = require('../models/message.model')
const Member = require('../models/member.model')
const User = require('../models/user.model')
const Room = require('../models/room.model')
const Page = require('../models/page.model')

const validate = (token) => {
    try {
        const decoded = jwt.verify(token, keys.api.key)
        return true;
        
    } catch (error){
        console.log(error.message)
        return false;
    }
}

exports.addMessage = async (msgInput) => {
    try {
        if(!validate(msgInput.token)) {
            return null
        }
        
        const user = await User.findById(msgInput.userID);
        const room = await Room.findById(msgInput.roomID);
        const page = await Page.findById(room.pageID);        

        const members = await Member.find({serverID: page.serverID, userID: msgInput.userID})
        const member = members[0]       

        const today = new Date()
                // 2020-06-02 14:14
        const date = today.getFullYear() + '-' 
                    + (today.getMonth()+1) + '-' 
                    + today.getDate() + ' ' 
                    + today.getHours() + ':'
                    + today.getMinutes() 

        let message = new Message({
            roomID: msgInput.roomID,
            memberID: member.id,
            content: msgInput.content,
            date: date,
        })

        message.save()

        return {
            content: msgInput.content,
            date: date,
            roomID: msgInput.roomID,
            member: {
                id: member.id,
                role: member.role,
                user: {
                    email: user.email,
                    name: user.name,
                    thumbnail: user.thumbnail,
                    id: user.id,
                }
            }
        }
    } catch(error) {
        console.log(error.message)
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