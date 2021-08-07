const mongoose = require("mongoose");

module.exports = function () {
    mongoose.connect("mongodb://localhost:27017/rent", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(() => console.log("Connected to MongoDB..."));
}