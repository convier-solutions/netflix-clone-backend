const { check } = require("express-validator");

exports.signupValidation = [
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .notEmpty()
    .withMessage("Email is required"),
  check("password")
    .isLength({ min: 6, max: 15 })
    .withMessage("Password must be between 6 and 15 characters")
    .notEmpty()
    .withMessage("Password is required"),
];

exports.loginValidation = [
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .notEmpty()
    .withMessage("Email is required"),
  check("password")
    .isLength({ min: 6, max: 15 })
    .withMessage("Password must be between 6 and 15 characters")
    .notEmpty()
    .withMessage("Password is required"),
];
