const express = require("express")
const mongoose = require("mongoose")
const app = express()
const PORT = 3000 || process.env.PORT
const { userRouter } = require("./routes/userRoute")
const { employeeRouter } = require("./routes/employeeRoute")
const URI = "mongodb+srv://namdo:namdo@cluster0.qftfl.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority"
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

mongoose.connect(URI, { useNewUrlParser: true.valueOf(), useUnifiedTopology: true }, err => {
	if (err) {
		console.log(err);
	}
})

app.use("/api/user", userRouter)
app.use("/api/emp", employeeRouter)

app.get("/", (req, res) => {
	res.status(200).send("Hello from Assignment 1")
})
app.listen(PORT, () => {
	console.log(`Server is up and running in port ${PORT}`)
})
