const express = require("express");
const employeeAPI = require("../controller/employeeController.js");
const auth_user = require("../middleware/authentication.js");
const employeeRouter = express.Router();

employeeRouter.route("/add").post(auth_user, employeeAPI.createEmployee);
employeeRouter.route("/").get(auth_user, employeeAPI.getEmployeeByQuery);
employeeRouter.route("/all").get(auth_user, employeeAPI.getAllEmployee);
employeeRouter
  .route("/update/id/:id")
  .put(auth_user, employeeAPI.updateEmployee);
employeeRouter
  .route("/delete/id/:id")
  .delete(auth_user, employeeAPI.deleteEmployee);

module.exports = employeeRouter;
