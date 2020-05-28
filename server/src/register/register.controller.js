const keys = require("../../config/keys")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userModel = require("../models/register.models")

exports.signup = async (req, res) => {
    try {
        const email = req.body.email
        let user = await userModel.findOne({email})

        if (user) {
            return res.status(400).json({message: "User already exists."})
        }

        user = new userModel(req.body)
        
        //hash the password before storing
        user.password = await bcrypt.hash(user.password+keys.api.key, 10);

        // user.password = hashPassword(user.password)
        await user.save()

        const token = createToken(user)

        return res.status(200).json({'token': token})

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({email});

        if(!user) {
            return res.status(400).json({message: 'User with that email does not exist.'});
        }


        const result = await bcrypt.compare(password+keys.api.key, user.password)
        
        if (!result) {
            return res.status(400).json({message: "Incorrect password."})
        }
        
        // if(!(password == jwt.verify(user.password, keys.api.key).password)) {
        //     return res.status(400).json({message: "Incorrect password."})
        // }

        const token = createToken(user)

        return res.status(200).json({'token': token})

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: error.message})
    }
}

exports.validate = async (req, res, next) => {
    if(!req.body.token) {
        return res.status(400).json({message: "Missing token"})
    }

    const decoded = jwt.verify(req.body.token, keys.api.key)

    if(!decoded.user) {
        return res.status(400).json({message: "Invalid token"})
    }

    if(decoded.exp < Math.floor(Date.now()/1000)) {
        return res.status(400).json({message: "Expired token"})
    }

    const token = createToken(decoded.user)

    //res.status(200).write({token: token})
    req.body.token = token

    next()
}

exports.signout = (req, res) => {
    return res.status(200).json({})
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