const express = require("express")
const route = express.Router()
const { User } = require("../models/User")
route.post("/signup", async (req, res) => {
	let { username, email, password } = req.body
	const user = new User({ username, email, password })

	let response
	try {
		const result = await user.save()
		response = result
		res.status(201)
	} catch (error) {
		response = {
			status: "false",
			message: "username/email has already been taken"
		}
		res.status(400)
	}
	res.send(response)
	// console.log(user)
})

route.post("/login", async (req, res) => {
	let { username, password } = req.body
	let response
	try {
		let user = await User.findOne({ username, password })
		response = {
			status: true,
			username: user.username,
			message: "User logged in successfully"
		}
		res.status(200)
	} catch (error) {
		response = {
			status: false,
			message: "Invalid Username or password"
		}
		res.status(400)
	}
	res.send(response)
})

module.exports.userRouter = route
