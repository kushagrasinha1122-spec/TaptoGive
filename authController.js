// controllers/authController.js
// Handles user signup and login logic.

const pool = require("./db");

// ─────────────────────────────────────────────
// POST /api/auth/signup
// Register a new user
// ─────────────────────────────────────────────
const signup = async (req, res) => {
  const { full_name, email, password } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required: full_name, email, password",
    });
  }

  try {
    // Check if user already exists
    const existing = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email.toLowerCase()]
    );
    if (existing.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // Insert new user (storing password as-is for simplicity; use bcrypt in production)
    const query = `
      INSERT INTO users (full_name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, full_name, email, created_at;
    `;
    const values = [full_name.trim(), email.toLowerCase().trim(), password];
    const result = await pool.query(query, values);

    return res.status(201).json({
      success: true,
      message: "Account created successfully 🎉",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error in signup:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// ─────────────────────────────────────────────
// POST /api/auth/login
// Authenticate a user
// ─────────────────────────────────────────────
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  try {
    const query = `SELECT id, full_name, email, password, created_at FROM users WHERE email = $1`;
    const result = await pool.query(query, [email.toLowerCase().trim()]);

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const user = result.rows[0];

    // Simple password comparison (use bcrypt.compare in production)
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Don't return password in response
    const { password: _, ...safeUser } = user;

    return res.status(200).json({
      success: true,
      message: "Login successful ✅",
      user: safeUser,
    });
  } catch (error) {
    console.error("Error in login:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

module.exports = { signup, login };
