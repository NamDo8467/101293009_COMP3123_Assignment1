const mongoose = require("mongoose")

const EmployeeSchema = mongoose.Schema({
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true
	},
	gender: {
		type: String
	},
	salary: {
		type: Number,
		required: true
	}
})
const EmployeeModel = mongoose.model("Employee", EmployeeSchema, "employees")
module.exports.Employee = EmployeeModel
