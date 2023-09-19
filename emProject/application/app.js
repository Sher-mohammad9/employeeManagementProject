const express = require("express");
const path = require("path");
require("../database/db-config.js");
const userRouter = require("../router/userRouter.js");
const employeeRouter = require("../router/employeeRouter.js");

const staticPath = path.join(__dirname, ".././views");
const app = express();

app.use(express.json());

app.set("view engine", "ejs");
// app.set("view engine" , "hbs")
// app.use(express.static(staticPath));

app.route("/").get((req, resp) => {
  resp.render("home");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/employee", employeeRouter);

module.exports = app;
