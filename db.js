const { Pool } = require('pg');
const { Kysely, PostgresDialect } = require('kysely');

const dialect = new PostgresDialect({
  pool: new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    max: 10,
  }),
});

// Si tu as un schéma de tables typé, remplace <Database> par ton interface
const db = new Kysely(dialect);

module.exports = { db };