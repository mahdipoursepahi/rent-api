const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
    name: {
        type: String, required: true, minlength: 3, maxlength: 50
    },
    email: {
        type: String, unique: true, require: true, minlength: 5, maxlength: 255
    },
    password: {
        type: String, required: true, minlength: 5, maxlength: 1024
    },
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, name: this.name }, config.get("jwtPrivateKey"));
}

const User = mongoose.model("User", userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;