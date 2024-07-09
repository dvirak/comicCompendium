const client = require("../../client");

async function buildBooksTable() {
  console.log("STARTING TO BUILD Books TABLE...");

  try {
    await client.query(`
      CREATE TABLE books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) UNIQUE NOT NULL,
        publish_date DATE NOT NULL,
        description TEXT NOT NULL,
        print_length INTEGER NOT NULL,
        series_volume VARCHAR(255) NOT NULL,
        cover_image VARCHAR(255) NOT NULL,
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
