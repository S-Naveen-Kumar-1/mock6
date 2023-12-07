const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    title: String,
    content: String,
    category: String,
    userName: String,
    userID: String,
    date: String
},
    { versionKey: false }

)

const BlogModel = mongoose.model("blog", blogSchema)
module.exports = { BlogModel }