const whitelist = [
    'http://localhost:9000/',
]

exports.check = (req, res, next) => {
    const origin = req.headers.referer;

    if(whitelist.indexOf(origin) !== -1) {
        next();
    } else {
        res.json({
            "msg": `Access denied from ${origin}`
        })
    }
}