const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { db } = require("../../Config/dbConnection");
const { validationResult } = require("express-validator");

// Signup API
exports.signup = async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }

  try {
    const userExistsQuery = `SELECT * FROM user WHERE email = ?`;
    db.query(userExistsQuery, [email], async (error, results) => {
      if (error) {
        return res.status(500).json({
          status: "Error",
          message: "Database error",
          error: error.message,
        });
      }

      if (results.length > 0) {
        return res
          .status(400)
          .json({ status: "Error", message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const insertUserQuery = `INSERT INTO user (email, password) VALUES (?, ?)`;
      db.query(insertUserQuery, [email, hashedPassword], (error, result) => {
        if (error) {
          return res.status(500).json({
            status: "Error",
            message: "Failed to register user",
            error: error.message,
          });
        }

        // Generate JWT
        const token = jwt.sign(
          { userId: result.insertId, email },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );

        return res.status(201).json({
          status: "Success",
          message: "User registered successfully",
          token,
        });
      });
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Login API
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }

  try {
    const userQuery = `SELECT * FROM user WHERE email = ?`;
    db.query(userQuery, [email], async (error, results) => {
      if (error) {
        return res.status(500).json({
          status: "Error",
          message: "Database error",
          error: error.message,
        });
      }

      if (results.length === 0) {
        return res
          .status(400)
          .json({ status: "Error", message: "Invalid email or password" });
      }

      const user = results[0];

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ status: "Error", message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        status: "Success",
        message: "Login successful",
        data: {
          token: token,
        },
      });
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
