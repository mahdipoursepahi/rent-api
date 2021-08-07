const Joi = require("joi");
const mongoose = require("mongoose");

const Advertisement = mongoose.model("Advertisement", {
    title: { type: String, required: true, minlength: 5, maxlength: 250 },
    address: { type: String, required: true, minlength: 5, maxlength: 250 },
    phoneNumber: { type: String, required: true },
    coordinates: {
        type: new mongoose.Schema({
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
        }),
        required: true
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    }
});

function validateAdvertisement(advertisement) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(250).required(),
        address: Joi.string().min(5).max(250).required(),
        phoneNumber: Joi.string().pattern(new RegExp('^(\\+98|0)?9\\d{9}$')).required(),
        coordinates: Joi.object({
            lat: Joi.number().required(),
            lng: Joi.number().required()
        }).required()
    });
    return schema.validate(advertisement);
}

exports.Advertisement = Advertisement;
exports.validate = validateAdvertisement;