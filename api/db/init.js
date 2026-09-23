const fs = require("fs");
const path = require("path");
const pool = require("../db");

async function initDB() {
  try {
    // 1. Création des tables (assurez-vous d'avoir mis IF NOT EXISTS dans init_schema.sql)
    const schemaPath = path.join(__dirname, "init_schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");

    await pool.query(schema);
    console.log("✅ Tables vérifiées/initialisées");

    // Vérification : la base contient-elle déjà des utilisateurs ?
    const result = await pool.query('SELECT COUNT(*) FROM "user"');
    const userCount = parseInt(result.rows[0].count, 10);

    // 2. Insertion des données uniquement si la base est vide
    if (userCount === 0) {
      const seedPath = path.join(__dirname, "seed.sql");
      const seed = fs.readFileSync(seedPath, "utf8");

      await pool.query(seed);
      console.log("✅ Données insérées");
    } else {
      console.log(
        `⏩ Base de données déjà peuplée (${userCount} utilisateurs trouvés), seed ignoré.`,
      );
    }
  } catch (err) {
    console.error("❌ Erreur initialisation DB :", err.message);
    process.exit(1);
  }
}

module.exports = { initDB };
