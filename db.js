// config/db.js
// Sets up the PostgreSQL connection pool using the pg package.
// SSL is required for Neon databases.

const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon (hosted PostgreSQL)
  },
});
// Test the connection when the server starts
pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Failed to connect to the database:", err.message);
  } else {
    console.log("✅ Connected to Neon PostgreSQL database");
    release();
  }
});
module.exports = pool;
