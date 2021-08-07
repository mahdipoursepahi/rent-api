const express = require("express");
const app = express();
require("express-async-errors");
require("./startup/db")();
require("./startup/validation")();
require("./startup/routes")(app);
require("./startup/config")();

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));