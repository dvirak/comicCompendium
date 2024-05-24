//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------BUILD BOOK PUBLISHERS TABLE-------------
async function buildBookPublishersTable() {
  console.log("STARTING TO BUILD bookPublishers TABLE...");

  try {
    await client.query(`
      CREATE TABLE book_publishers (
        id SERIAL PRIMARY KEY,
        book_id INTEGER REFERENCES books(id),
        publisher_id INTEGER REFERENCES publishers(id),
        CONSTRAINT unique_book_publisher UNIQUE (book_id, publisher_id)
      );
    `);

    console.log("FINISHED BUILDING bookPublishers TABLE!");
  } catch (error) {
    console.error("Error creating bookPublishers table: " + error.message);
    throw error;
  }
}
//* --------------BUILD BOOK PUBLISHERS TABLE-------------

module.exports = {
  buildBookPublishersTable,
};
