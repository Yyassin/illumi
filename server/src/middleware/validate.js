const keys = require("../../config/keys")
const jwt = require("jsonwebtoken")

// origin can make calls without token
const ORIGIN = 'http://localhost:5000'

module.exports = async (req, res, next) => {
    try {
        const { query, req_auth} = check_query(req)

        if(!req_auth){
           return next();
        }
    
        if(!req.headers.token) {
            return res.status(400).json({message: "Missing token"})
        }

        if (query.includes('signout')) {
            res.append('token', '')
            return next();
        }
        
        const decoded = jwt.verify(req.headers.token, keys.api.key)
        const token = createToken(decoded.user);

        res.append('token', token)
        next()        
    } catch(error) {
        console.log(error)
        return res.status(400).json({message: error.message})    
    }
}

const check_query = (req) => {
    if(req.headers.origin && req.headers.origin == ORIGIN) {
        return { req_auth: false }
    }

    const query = req.body.query

    if(!query) {
        return { query, req_auth: false}
    }

    if (query.includes('signin') || query.includes('signup')) {
        // query does not require auth
        return { query, req_auth: false}
    } else {
        return { query, req_auth: true}
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
            {expiresIn: 60}
        )
    )
}