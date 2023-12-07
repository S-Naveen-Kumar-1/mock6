
const express = require("express")
const { BlogModel } = require("../model/blogs.model")
const { auth } = require("../middleware/auth.middleware")

const blogRouter = express()
blogRouter.use(auth)
blogRouter.post("/blogs", async (req, res) => {
    try {
        const blog = new BlogModel(req.body)
        await blog.save()
        res.status(200).send({ "msg": "Blog successfully uploaded", "blog": req.body })
    }
    catch (err) {
        res.send(err.message)
    }
})
blogRouter.get("/blogs", async (req, res) => {

    try {
        const blogs = await BlogModel.find({ userName: req.body.userName })
        res.status(200).send(blogs)
    }
    catch (err) {
        res.send(err.message)
    }
})
blogRouter.get("/blogs/title", async (req, res) => {
    const { title } = req.query
    try {
        const blogs = await BlogModel.find({ title: title })
        res.status(200).send(blogs)
    }
    catch (err) {
        res.send(err.message)
    }
})
blogRouter.patch("/blogs/:id", async (req, res) => {
    const { id } = req.params
    const blog = await BlogModel.findOne({ _id: id })
    try {
        await BlogModel.findByIdAndUpdate({ _id: blog._id }, req.body)
        res.status(200).send({ "msg": "Blog successfully updated", "blog": req.body })
    }
    catch (err) {
        res.send(err.message)
    }
})
blogRouter.delete("/blogs/:id", async (req, res) => {
    const { id } = req.params
    const blog = await BlogModel.findOne({ _id: id })
    try {
        await BlogModel.findByIdAndDelete({ _id: blog._id })
        res.status(200).send({ "msg": "Blog successfully deleted", "blog": req.body })
    }
    catch (err) {
        res.send(err.message)
    }
})
module.exports = { blogRouter }