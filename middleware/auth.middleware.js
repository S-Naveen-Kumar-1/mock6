const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1]

    try {
        jwt.verify(token, "masai", (err, decoded) => {
            if (decoded) {
                req.body.userName = decoded.userName,
                    req.body.userID = decoded.userID,
                    req.body.date = new Date()
                next()
            }
            else {
                res.send({ "msg": "Please Login", "err": err })
            }
        })
    }
    catch (err) {
        res.send(err.message)
    }
}
module.exports = { auth }