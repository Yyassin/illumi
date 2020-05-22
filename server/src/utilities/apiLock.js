const whitelist = [
    'http://localhost:9000/',
]

// check if request origin is whitelisted
exports.check = (req, res, next) => {
    const origin = req.headers.referer;

    // if(whitelist.indexOf(origin) !== -1) {
    //     next();
    // } else {
    //     res.json({
    //         "msg": `Access denied from ${origin}`
    //     })
    // }
    next();
}