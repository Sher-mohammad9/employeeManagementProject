const employeeModel = require("../database/model/employeeModel.js");
const ApiFeatures = require("../apiFeatures/apiFeatures.js");

const createEmployee = async (req, resp) => {
  try {
    const employeeDetail = req.body;
    const employee = await employeeModel.create(employeeDetail);
    resp
      .status(201)
      .send({ status: 201, message: "Employee successfully create", employee });
  } catch (error) {
    resp.status(500).send({ status: 500, Error: error.message });
  }
};

const getEmployeeByQuery = async (req, resp) => {
  try {
    const employee = (
      await new ApiFeatures(employeeModel.find(), req.query)
        .filter()
        .sort()
        .paginate()
    ).limitField();
    const employeeData = await employee.query;
    if (employeeData.length > 0) {
      resp.status(200).send({ status: 200, employeeData });
    } else {
      resp
        .status(404)
        .send({ status: 404, message: "Employee Not Found", employeeData });
    }
  } catch (error) {
    resp.send({ Error: error.message });
  }
};

const getAllEmployee = async (req, resp) => {
  try {
    const employee = new ApiFeatures(employeeModel.find());
    const data = await employee.query;
    console.log(data);
    resp.send({ data });
  } catch (error) {
    resp.send({ Error: error.message });
  }
};

const updateEmployee = async (req, resp) => {
  try {
    const { id } = req.params;
    const updateEmployee = await employeeModel.findOneAndUpdate(
      { _id: id },
      { $set: req.body }
    );
    if (updateEmployee) {
      resp
        .status(200)
        .send({ status: 200, message: "Employee successfully update" });
    } else {
      resp.status(200).send({ status: 200, message: "Employee Not Found" });
    }
  } catch (error) {
    resp.status(500).send({ status: 500, Error: error.message });
  }
};

const deleteEmployee = async (req, resp) => {
  try {
    const { id } = req.params;
    const employee = await employeeModel.findOneAndDelete({ _id: id });
    if (employee) {
      resp
        .status(200)
        .send({ status: 200, message: "Employee successfully delete" });
    } else {
      resp.status(200).send({ status: 200, message: "Employee Not Found" });
    }
  } catch (error) {
    resp.status(500).send({ status: 500, Error: error.message });
  }
};

module.exports = {
  createEmployee,
  getEmployeeByQuery,
  getAllEmployee,
  updateEmployee,
  deleteEmployee,
};
