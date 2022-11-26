const express = require("express")
const route = express.Router()
const { Employee } = require("../models/Employee")
let mongoose = require("mongoose")

const handleError = (error, response) => {
	response.status = "false"
	if (error.code == 11000) {
		response.message = "Email already exists"
	} else if (error.errors == undefined) {
		if (error.name === "CastError") {
			response.message = "Salary must be a number" // This could be either Employee ID is not correct or Salary must be a number
		}
	} else if (error.errors.first_name) {
		response.message = "First name can not be empty"
	} else if (error.errors.last_name) {
		response.message = "Last name can not be empty"
	} else if (error.errors.email) {
		response.message = "Email can not be empty"
	} else if (error.errors.salary) {
		response.message = "Salary must be number"
	}
}
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
		let response = {}
		try {
			let { first_name, last_name, email, gender, salary } = req.body
			let employee = new Employee({ first_name, last_name, email, gender, salary })
			response = await employee.save()
			res.status(201)
		} catch (error) {
			handleError(error, response)

			res.status(400)
		}
		res.send(response)
	})

route
	.route("/employees/:eid")
	.get(async (req, res) => {
		/* This method is used to get a specific employee */
		let id = req.params.eid
		let response = {}
		try {
			const employee = await Employee.findById(id)
			response = employee
			res.status(200)
		} catch (error) {
			res.status(400)

			handleError(error, response)
		}
		res.send(response)
	})
	.put(async (req, res) => {
		/* This method is used to update a specific employee information */
		let id = req.params.eid
		let update = req.body
		let response = {}
		try {
			const employee = await Employee.findOneAndUpdate(id, update)

			response = employee
			res.status(200)
		} catch (error) {
			handleError(error, response)

			res.status(400)
		}
		res.send(response)
	})

route.delete("/employees", async (req, res) => {
	let id = mongoose.Types.ObjectId(req.body.id)
	let response = {}
	try {
		const employee = await Employee.findByIdAndDelete(id)
		response = { id }

		res.status(204)
	} catch (error) {
		handleError(error, response)
		res.status(400)
	}
	res.send(response)
})

module.exports.employeeRouter = route
