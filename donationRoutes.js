// routes/donationRoutes.js
// Defines the API routes and maps them to controller functions.

const express = require("express");
const router = express.Router();
const { createDonation, getAllDonations } = require("./donationController");

// POST /api/donate → Save a new donation
router.post("/donate", createDonation);

// GET /api/donations → Get all donations
router.get("/donations", getAllDonations);

module.exports = router;
