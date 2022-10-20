const express = require("express")
const route = express.Router()
const { Employee } = require("../models/Employee")

route
	.route("/employees")
	.get(async (req, res) => {
		/** This method is used to get all employees */
		let response
		try {
			response = await Employee.find()
			res.status(200)
		} catch (error) {
			response = {
				status: "false",
				message: "Can not access to employees collection"
			}
			res.status(400)
		}
		res.send(response)
	})
	.post(async (req, res) => {
		/**This method is used to add a new employee to the collection*/
		let response
		try {
			let { first_name, last_name, email, gender, salary } = req.body
			let employee = new Employee({ first_name, last_name, email, gender, salary })
			response = await employee.save()
			res.status(201)
		} catch (error) {
			response = { status: "false" }

			if (error.code == 11000) {
				response.message = "Email already exists"
			} else if (error.errors.first_name) {
				response.message = "First name can not be empty"
			} else if (error.errors.last_name) {
				response.message = "Last name can not be empty"
			} else if (error.errors.salary) {
				response.message = "Salary must be number"
			}

			res.status(400)
		}
		res.send(response)
	})

route
	.route("/employees/{eid}")
	.get((req, res) => {})
	.put((req, res) => {})

route.delete("/employees", (req, res) => {})

module.exports.employeeRouter = route
