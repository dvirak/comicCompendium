//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------BUILD BOOK PENCILLERS TABLE-------------
async function buildBookPencillersTable() {
  console.log("STARTING TO BUILD bookPencillers TABLE...");

  try {
    await client.query(`
      CREATE TABLE book_pencillers (
        id SERIAL PRIMARY KEY,
        book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
        penciller_id INTEGER REFERENCES pencillers(id) ON DELETE CASCADE,
        CONSTRAINT unique_book_penciller UNIQUE (book_id, penciller_id)
      );
    `);

    console.log("FINISHED BUILDING bookPencillers TABLE!");
  } catch (error) {
    console.error("Error creating bookPencillers table: " + error.message);
    throw error;
  }
}
//* --------------BUILD BOOK PENCILLERS TABLE-------------

module.exports = {
  buildBookPencillersTable,
};
