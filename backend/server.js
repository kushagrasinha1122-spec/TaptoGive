// server.js
// Entry point of the Tap2Give backend.
// Sets up Express, middleware, and routes.

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const donationRoutes = require("./donationRoutes");
const authRoutes = require("./authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ─────────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────────

// Enable CORS — allows your frontend to talk to this backend
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// ─────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────

// Mount all donation-related routes under /api
app.use("/api", donationRoutes);

// Mount authentication routes under /api/auth
app.use("/api/auth", authRoutes);

// Root health check — useful for testing if server is running
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Tap2Give API 🎗️" });
});

// ─────────────────────────────────────────────
// Handle unknown routes (404)
// ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ─────────────────────────────────────────────
// Start Server
// ─────────────────────────────────────────────
const pool = require("./db");

// Auto-create tables if they don't exist
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS donations (
        id SERIAL PRIMARY KEY,
        user_name VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        ngo_name VARCHAR(255) NOT NULL,
        amount NUMERIC(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Donations table ready");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Users table ready");
  } catch (err) {
    console.error("❌ Error creating tables:", err.message);
  }
};

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Tap2Give server running on port ${PORT}`);
  });
});
