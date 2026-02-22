// controllers/donationController.js
// Contains the business logic for handling donation requests.

const pool = require("./db");

// ─────────────────────────────────────────────
// POST /api/donate
// Store a new donation record in the database
// ─────────────────────────────────────────────
const createDonation = async (req, res) => {
  const { user_name, phone_number, ngo_name, amount } = req.body;

  // Basic validation — make sure all fields are provided
  if (!user_name || !phone_number || !ngo_name || !amount) {
    return res.status(400).json({
      success: false,
      message: "All fields are required: user_name, phone_number, ngo_name, amount",
    });
  }

  // Validate that amount is a positive number
  if (isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Amount must be a positive number",
    });
  }

  try {
    // Parameterized query — safe against SQL injection
    const query = `
      INSERT INTO donations (user_name, phone_number, ngo_name, amount)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const values = [user_name, phone_number, ngo_name, amount];
    const result = await pool.query(query, values);

    return res.status(201).json({
      success: true,
      message: "Donation recorded successfully 🎉",
      donation: result.rows[0],
    });
  } catch (error) {
    console.error("Error in createDonation:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// ─────────────────────────────────────────────
// GET /api/donations
// Fetch all donation records from the database
// ─────────────────────────────────────────────
const getAllDonations = async (req, res) => {
  try {
    const query = `SELECT * FROM donations ORDER BY created_at DESC;`;
    const result = await pool.query(query);

    return res.status(200).json({
      success: true,
      count: result.rows.length,
      donations: result.rows,
    });
  } catch (error) {
    console.error("Error in getAllDonations:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

module.exports = { createDonation, getAllDonations };
