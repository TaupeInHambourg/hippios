var express = require("express");
var router = express.Router();
var pool = require("../db");

// GET /horses — liste tous les chevaux
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT h.id, h.name, b.name AS breed FROM horse h LEFT JOIN breed b ON h.id_breed = b.id ORDER BY h.created_at DESC",
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /horses/:id — récupère un cheval par son ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT h.id, h.name, b.name AS breed 
       FROM horse h 
       LEFT JOIN breed b ON h.id_breed = b.id 
       WHERE h.id = $1`,
      [id],
    );
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
  // Il faut envoyer id_breed et id_user depuis le frontend
  const { name, id_breed, id_user } = req.body;

  if (!name) return res.status(400).json({ error: "name is required" });
  if (!id_user) return res.status(400).json({ error: "id_user is required" }); // Requis par votre schéma

  try {
    const result = await pool.query(
      "INSERT INTO horse (name, id_breed, id_user) VALUES ($1, $2, $3) RETURNING *",
      [name, id_breed || null, id_user],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
