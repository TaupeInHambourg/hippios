const fs = require("fs");
const path = require("path");
const pool = require("../db");

async function initDB() {
  try {
    // 1. Création des tables
    const schemaPath = path.join(__dirname, "init_schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");

    await pool.query(schema);

    console.log("✅ Tables initialisées");

    // 2. Insertion des données
    const seedPath = path.join(__dirname, "seed.sql");
    const seed = fs.readFileSync(seedPath, "utf8");

    await pool.query(seed);

    console.log("✅ Données insérées");
  } catch (err) {
    console.error("❌ Erreur initialisation DB :", err.message);
    process.exit(1);
  }
}

module.exports = { initDB };