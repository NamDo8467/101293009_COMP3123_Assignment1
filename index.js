const express = require("express")
const app = express()
const port = 3000 || process.env.PORT
const { userRouter } = require("./routes/userRoute")
const { employeeRouter } = require("./routes/employeeRoute")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/api/user", userRouter)
app.use("/api/emp", employeeRouter)

app.get("/", (req, res) => {
	res.status(200).send("Hello from Assignment 1")
})
app.listen(port, () => {
	console.log("Server is up and running")
})
