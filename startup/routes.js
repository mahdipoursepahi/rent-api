const express = require("express");
const cors = require("cors");
const users = require("../routes/users");
const advertisements = require("../routes/advertisements");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
    app.use(cors());
    app.use(express.json());
    app.use("/api/users", users);
    app.use("/api/advertisements", advertisements);
    app.use("/api/auth", auth);
    app.use(error);
}