const keys = require("../../config/keys")
const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
    try {
        const query = req.body.query

        if(query.includes('signin') || query.includes('signup')){
           return next();
        }
        
        if(!req.headers.token) {
            return res.status(400).json({message: "Missing token"})
        }
    
        const decoded = jwt.verify(req.headers.token, keys.api.key)
    
        if(!decoded.user) {
            return res.status(400).json({message: "Invalid token"})
        }
    
        if(decoded.exp < Math.floor(Date.now()/1000)) {
            return res.status(400).json({message: "Expired token"})
        }

        if (query.includes('signout')) {
            res.append('token', '')
            return next();
        }
        
        const token = createToken(decoded.user);

        res.append('token', token)
        next()        
    } catch(error) {
        return res.status(400).send(error.message)    
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