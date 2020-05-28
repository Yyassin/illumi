const keys = require("../../../config/keys")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require('../../models/register.models')

module.exports = {
    users: async () => {
        try {
            return users = await User.find();
        } catch(err) {
            throw err;
        }
    },
    
    user: async (args) => {
        try {
            return users = await User.findById(args.id);
        } catch(err) {
            throw err;
        }
    },

    signup: async({email, password}) => {
        try {
            let user = await User.findOne({email})
    
            if (user) {
                return Error("User with that email already exist")
            }
    
            user = new User({
                email: email,
                password: await bcrypt.hash(password+keys.api.key, 10)
            })
 
            await user.save()
            const token = createToken(user)

            return { token: token }
    
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
            return { token: token }
    
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
    }
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