// routes/horses.js
var express = require("express");
var router = express.Router();
var pool = require("../db");

// GET /horses — liste tous les chevaux
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM horses ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /horses/:id — récupère un cheval par son ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM horses WHERE id=$1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Horse not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /horses — ajoute un cheval
router.post("/", async (req, res) => {
  const { name, breed } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });

  try {
    const result = await pool.query(
      "INSERT INTO horses (name, breed) VALUES ($1, $2) RETURNING *",
      [name, breed]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;