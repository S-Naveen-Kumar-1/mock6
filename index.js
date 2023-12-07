
const express = require("express")
const cors = require("cors")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.routes")
const { blogRouter } = require("./routes/blogs.routes")
const app = express()
app.use(express.json())
app.use(cors())
app.use("/api", userRouter)
app.use("/api", blogRouter)

app.listen(8080, async () => {
    try {
        await connection
        console.log("connected to db")
        console.log("server running in 8080")
    }
    catch (err) {
        console.log(err)
    }
})