const express = require("express")
const route = express.Router()

route
	.route("/employees")
	.get((req, res) => {
		// res.send("employeeRouter")
	})
	.post((req, res) => {})

route
	.route("/employees/{eid}")
	.get((req, res) => {})
	.put((req, res) => {})

route.delete("/employees", (req, res) => {})

module.exports.employeeRouter = route
