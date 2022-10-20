const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
})

const UserModel = mongoose.model("User", UserSchema, "users")

module.exports.User = UserModel
