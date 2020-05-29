const keys = require("../../../config/keys")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require('../../models/user.model')
const msgResolver = require('./messages.resolver')

module.exports = {    
    user:  async (args) => getUser(args),
    users: async () => getUsers(),

    signup: async ({email, password}) => signup({email, password}),
    signin: async ({email, password}) => signup({email, password}),
    signout: async () => signout(),
}

const getUser = async (args) => {
    try {
        const user = await User.findById(args.id);
        const messages = await msgResolver.messages(user.id) ;              
        
        const result = {
            id: user.id,
            email: user.email,
            password: user.password,
            name: user.name,
            messages: messages
        }

        return result
    } catch(err) {
        throw err;
    }
}

const getUsers = async () => {
    try {
        query = await User.find();

        let users = [];
        
        for await(const entry of query){
            users.push(getUser({id: entry._id}))
        }

        return users

    } catch(err) {
        throw err;
    }
}

const signup = async({email, password}) => {
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
}

const signin = async ({ email, password }) => {
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
}

const signout = async () => {
    //context.res.append('Token', context.body)
    try {
        return ''
    } catch (error) {
        console.log(error)
        throw new Error("Internal Server Error") 
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