const express = require("express");
const router = express.Router();

const pool = require("../config/db");

// Create user
router.post("/", async (req, res) => {
    try {
        const { name, email, age } = req.body;

        const result = await pool.query(
            `INSERT INTO users (name, email, age)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [name, email, age]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all users
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM users"
        );

        res.json(result.rows);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;