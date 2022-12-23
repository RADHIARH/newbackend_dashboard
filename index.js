// Add packages
const express = require("express");
// Initialize Express
const app = express();
// body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create GET request
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

// import cors
var cors = require("cors");
app.use(cors());
// import dotenv
require("dotenv").config();
// import database
var mysql = require("mysql2");
const pool = require("./db");
// import fileupload
const fileupload = require("express-fileupload");
app.use(fileupload());
// connect server
const port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log("Node app is running on port " + port);
});
// Export the Express API

//  import routers
const user = require("./routes/user");
const permission = require("./routes/permission");
const invit = require("./routes/invit");

app.use("/", user);
app.use("/", permission);
app.use("/", invit);
module.exports = app;
