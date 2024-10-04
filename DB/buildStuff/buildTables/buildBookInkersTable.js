//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------BUILD BOOK INKERS TABLE-------------
async function buildBookInkersTable() {
  console.log("STARTING TO BUILD bookInkers TABLE...");

  try {
    await client.query(`
      CREATE TABLE book_inkers (
        id SERIAL PRIMARY KEY,
        book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
        inker_id INTEGER REFERENCES inkers(id) ON DELETE CASCADE,
        CONSTRAINT unique_book_inker UNIQUE (book_id, inker_id)
      );
    `);

    console.log("FINISHED BUILDING bookInkers TABLE!");
  } catch (error) {
    console.error("Error creating bookInkers table: " + error.message);
    throw error;
  }
}
//* --------------BUILD BOOK INKERS TABLE-------------

module.exports = {
  buildBookInkersTable,
};
