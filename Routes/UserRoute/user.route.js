const express = require("express");
const route = express.Router();
const userController = require("../../Controllers/UserController/user.controller");
const {
  signupValidation,
  loginValidation,
} = require("../../Middleware/Validation");

route.post("/signup", signupValidation, userController.signup);
route.post("/login", loginValidation, userController.login);

module.exports = route;
