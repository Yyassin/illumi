const keys = require("../../../config/keys")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require('../../models/user.model')
const msgResolver = require('./messages.resolver')

module.exports = {    
    signup: async({email, password, thumbnail, name}) => {
        try {
            let user = await User.findOne({email})
    
            if (user) {
                return Error("User with that email already exist")
            }
    
            user = new User({
                email: email,
                password: hashPassword(password),
                name: name ? name : "",
                thumbnail: thumbnail ? thumbnail : "",
            })
    
            await user.save()
            const token = createToken(user)
    
            return {uid: user._id, token: token }
    
        } catch (error) {
            throw new Error("Internal Server Error")
    
        }
    },

    signin: async ({ email, password }) => {
        try {
            const user = await User.findOne({email});
    
            if(!user) {
                return Error("User with that email does not exist.")
            }
    
    
            const result = await bcrypt.compare(password+keys.api.key, user.password)
            
            if (!result) {
                return Error("Incorrect Password.")
            }
    
            const token = createToken(user)
            return {uid: user._id, token: token }
    
        } catch (error) {
            throw new Error("Internal Server Error")
        }
    },

    signout: async () => {
        //context.res.append('Token', context.body)
        try {
            return ''
        } catch (error) {
            console.log(error)
            throw new Error("Internal Server Error") 
        }
    },

    newPassword: async (password) => {
        return hashPassword(password)
    }
}

const hashPassword = async(password) => {
    return bcrypt.hash(password+keys.api.key, 10)
}

const createToken = (user) => {
    return (
        jwt.sign(
            {
                user: user,
                date: Date.now()
            },
            keys.api.key,
            {expiresIn: '1h'}
        )
    )
}