const { betterAuth } = require("better-auth");
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,     // "postgres" injecté par Docker
  port: parseInt(process.env.DB_PORT || "5432"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const auth = betterAuth({
  database: pool,
  trustedOrigins: (process.env.TRUSTED_ORIGINS || "").split(","),
});

module.exports = { auth, pool };