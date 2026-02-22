# Tap2Give Backend

A minimal, clean backend for the Tap2Give donation project.

---

## 📁 Folder Structure

```
backend/
├── server.js                   ← Entry point
├── config/
│   └── db.js                   ← PostgreSQL connection (Neon)
├── routes/
│   └── donationRoutes.js       ← API route definitions
├── controllers/
│   └── donationController.js   ← Business logic
├── .env                        ← Environment variables (never commit this!)
└── package.json
```

---

## 🗄️ Step 1 — Create the Database Table

Run this SQL query in your **Neon SQL Editor** (or any PostgreSQL client):

```sql
CREATE TABLE IF NOT EXISTS donations (
  id           SERIAL PRIMARY KEY,
  user_name    VARCHAR(100)   NOT NULL,
  phone_number VARCHAR(20)    NOT NULL,
  ngo_name     VARCHAR(150)   NOT NULL,
  amount       NUMERIC(10, 2) NOT NULL,
  created_at   TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);
```

---

## ⚙️ Step 2 — Configure Environment Variables

Open the `.env` file and replace the placeholder with your **real Neon connection string**:

```
DATABASE_URL=postgresql://your_user:your_password@your_neon_host/your_database?sslmode=require
PORT=5000
```

> You can find your connection string in the **Neon dashboard → your project → Connection Details**.

---

## 📦 Step 3 — Install Dependencies

```bash
cd backend
npm install
```

---

## ▶️ Step 4 — Run the Server

**Development mode** (auto-restarts on file changes):
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

You should see:
```
✅ Connected to Neon PostgreSQL database
🚀 Tap2Give server running on http://localhost:5000
```

---

## 🔌 API Endpoints

### POST `/api/donate` — Submit a donation

**Request Body (JSON):**
```json
{
  "user_name": "Aarav Shah",
  "phone_number": "9876543210",
  "ngo_name": "CRY India",
  "amount": 500
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Donation recorded successfully 🎉",
  "donation": {
    "id": 1,
    "user_name": "Aarav Shah",
    "phone_number": "9876543210",
    "ngo_name": "CRY India",
    "amount": "500.00",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### GET `/api/donations` — Fetch all donations

**Success Response (200):**
```json
{
  "success": true,
  "count": 2,
  "donations": [...]
}
```

---

## 🧪 Testing with cURL

```bash
# Submit a donation
curl -X POST http://localhost:5000/api/donate \
  -H "Content-Type: application/json" \
  -d '{"user_name":"Aarav","phone_number":"9876543210","ngo_name":"CRY India","amount":500}'

# Get all donations
curl http://localhost:5000/api/donations
```

---

## 🔒 Security Notes

- All database queries use **parameterized values** (`$1`, `$2`) — safe from SQL injection.
- Never commit your `.env` file. Add it to `.gitignore`.
- SSL is enabled for the Neon connection (`rejectUnauthorized: false` is standard for hosted PG).
