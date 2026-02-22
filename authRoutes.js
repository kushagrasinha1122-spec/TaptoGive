// routes/authRoutes.js
// Defines authentication API routes.

const express = require("express");
const router = express.Router();
const { signup, login } = require("./authController");

// POST /api/auth/signup → Register a new user
router.post("/signup", signup);

// POST /api/auth/login → Login an existing user
router.post("/login", login);

module.exports = router;
