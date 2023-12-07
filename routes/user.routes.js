const express = require("express")
const bcrypt = require('bcrypt');
const { UserModel } = require("../model/auth.model");
const jwt = require('jsonwebtoken');
const userRouter = express()

userRouter.post("/register", (req, res) => {
    const { email, password, avatar, userName } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.send("couldnot hash")
            }
            else {
                const user = new UserModel({
                    userName,
                    email,
                    password: hash,
                    avatar
                })
                await user.save()
                res.status(200).send({ "msg": "Registered successfully", user: user })
            }
        });
    }
    catch (err) {
        res.status(400).send({ "err": err.message })
    }
})
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    try {
        const token = jwt.sign({ userName: user.userName, userID: user._id }, "masai")
        bcrypt.compare(password, user.password, async (err, result) => {
            if (result) {
                res.status(200).send({ "msg": "Login success", token: token })
            }
            else {
                res.status(200).send({ "msg": "Invalid Credentials" })

            }
        });
    }
    catch (err) {
        res.status(400).send({ "err": err.message })
    }
})
module.exports = { userRouter }