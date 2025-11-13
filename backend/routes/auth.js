import express from "express";
import bcrypt from "bcrypt";
import pool from "../functions/pool.js"; // your DB connection pool

const router = express.Router();

// POST /api/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, room, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // check if user already exists
    const existing = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: "Email already registered." });
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // insert new user
    await pool.query(
      "INSERT INTO users (name, room, email, password) VALUES ($1, $2, $3, $4)",
      [name, room, email, hashed]
    );

    res.status(200).json({ message: "Signup successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

export default router;
