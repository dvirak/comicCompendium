const { Client } = require("pg");

const connectionString =
  process.env.DATABASE_URL || "postgresql://localhost:5432/comicCompendium";

const client = new Client({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = client;
