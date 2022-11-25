const express = require("express")
const mongoose = require("mongoose")
const app = express()
const PORT = 5000 || process.env.PORT
const { userRouter } = require("./routes/userRoute")
const { employeeRouter } = require("./routes/employeeRoute")

const URL = "http://localhost:3000"

// app.use(cors({ origin: URL, optionsSuccessStatus: 200, credentials: true }))

app.set("trust proxy", 1)
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", URL)
	// res.setHeader("Access-Control-Allow-Credentials", true)
	// res.setHeader("Access-Control-Allow-Headers", "Authorization")
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin,X-Requested-With,X-HTTP-Method-Override,Content-Type,Accept,content-type,application/json,Authorization"
	)
	res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS")
	next()
})
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

mongoose.connect(process.env.DB_CONNECTION_LINK, { useNewUrlParser: true.valueOf(), useUnifiedTopology: true }, err => {
	if (err) {
		console.log(err)
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
