const mongoose = require("mongoose")
require("dotenv").config()
const URL = process.env.mongoURL
console.log(URL)
const connection = mongoose.connect(URL)
module.exports = { connection }