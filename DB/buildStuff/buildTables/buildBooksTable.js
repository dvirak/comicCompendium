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
        author_id INTEGER REFERENCES authors(id),
        illustrator_id INTEGER REFERENCES illustrators(id),
        penciller_id INTEGER REFERENCES pencillers(id),
        inker_id INTEGER REFERENCES inkers(id),
        colorist_id INTEGER REFERENCES colorists(id),
        letterer_id INTEGER REFERENCES letterers(id),
        publisher_id INTEGER REFERENCES publishers(id),
        series_name_id INTEGER REFERENCES series(id),
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
