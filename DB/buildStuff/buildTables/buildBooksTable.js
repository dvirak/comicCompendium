const client = require("../../client");

async function buildBooksTable() {
  console.log("STARTING TO BUILD Books TABLE...");

  try {
    await client.query(`
      CREATE TABLE books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) UNIQUE,
        publish_date DATE,
        description TEXT,
        print_length INTEGER,
        series_volume VARCHAR(255),
        cover_image VARCHAR(255),
        publisher_id INTEGER REFERENCES publishers(id),
        CONSTRAINT unique_id_title UNIQUE (id, title)
      );
    `);

    console.log("FINISHED BUILDING BOOKS TABLE!");
  } catch (error) {
    console.error("Error creating Books tables: " + error.message);
    throw error;
  }
}

module.exports = {
  buildBooksTable,
};
