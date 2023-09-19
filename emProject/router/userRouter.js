const express = require("express");
const userController = require("../controller/userController.js");
const auth_user = require("../middleware/authentication.js");
const userRouter = express.Router();

userRouter.route("/register").post(userController.registerUser);
userRouter.route("/login").post(userController.loginUser);
userRouter.route("/profile/:id").put(auth_user, userController.updateProfile);
userRouter.route("/logout").put(auth_user, userController.logoutUser);

module.exports = userRouter;