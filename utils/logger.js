const { createLogger, transports } = require("winston")
const fileTransport = new transports.File({ filename: 'uncaughtExceptions.log', level: "error" })

module.exports = createLogger({
    transports: [fileTransport],
    rejectionHandlers: [fileTransport],
    exceptionHandlers: [fileTransport]
});