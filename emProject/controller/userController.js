const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config.js");
const userModel = require("../database/model/userModel.js");

const registerUser = async (req, resp) => {
  try {
    const userDetail = req.body;
    if (userDetail.password === userDetail.confirmPassword) {
      delete userDetail["confirmPassword"];
      const passwordHash = await bcrypt.hash(userDetail.password, 10);
      userDetail.password = passwordHash;
      const createUser = await userModel.create(userDetail);
      generateToken(createUser, resp);
    } else {
      resp
        .status(200)
        .send({ status: 200, message: "confirm password not match" });
    }
  } catch (err) {
    resp.status(500).send({ status: 500, message: err.message });
  }
};

const loginUser = async (req, resp) => {
  try {
    const userDetail = req.body;
    const userExists = await userModel.findOne({ email: userDetail.email });
    if (userExists) {
      const checkPassword = await bcrypt.compare(
        userDetail.password,
        userExists.password
      );
      if (checkPassword) {
        generateToken(userExists, resp, true);
      } else {
        resp
          .status(400)
          .send({ status: 400, message: "Password is incurrect" });
      }
    } else {
      resp
        .status(404)
        .send({
          status: 404,
          message: "User Not Found By this email " + userDetail.email,
        });
    }
  } catch (err) {
    resp.status(500).send({ status: 500, message: err.message });
  }
};

const updateProfile = async (req, resp) => {
  try {
    const userId = req.params.id;
    let { password } = req.body;
    req.body.password = await bcrypt.hash(password, 10);
    await userModel.findByIdAndUpdate({ _id: userId }, { $set: req.body });
    resp
      .status(200)
      .send({ status: 200, message: "Profile successfully update" });
  } catch (error) {
    resp.status(500).send({ status: 500, Error: error.message });
  }
};

const logoutUser = async (req, resp) => {
  try {
    const userDetail = req.body;
    const userExists = await userModel.findOne({ email: userDetail.email });
    if(userExists && userExists.activity){
      const checkPassword = await bcrypt.compare(
        userDetail.password,
        userExists.password
      );
      if (checkPassword) {
        await userModel.findOneAndUpdate({ email: userDetail.email }, {$set : {activity : false}});
        resp
          .status(200)
          .send({ status: 200, message: "User Successfully logout" });
      } else {
        resp.status(200).send({ status: 200, message: "Password are not match" });
      }
    }else{
      resp.status(404).send({ status: 404, message: "User not found" })
    }
  } catch (error) {
    resp.status(500).send({ status: 500, Error: error.message });
  }
};

const generateToken = async (userDetail, resp, flag) => {
  jwt.sign(
    { userDetail },
    config.secretKey,
    { expiresIn: "24h" },
    (error, token) => {
      userDetail["password"] = undefined;
      if (error) {
        resp.status(204).send({ status: 204, Error: error.message });
      } else if (flag) {
        resp
          .status(200)
          .send({
            status: 200,
            message: "logIn successfully",
            userDetail,
            token,
          });
      } else {
        resp
          .status(201)
          .send({
            status: 201,
            message: "Register successfully",
            userDetail,
            token,
          });
      }
    }
  );
};

module.exports = {
  registerUser,
  loginUser,
  updateProfile,
  logoutUser,
};
