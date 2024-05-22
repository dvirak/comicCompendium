//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------BUILD BOOK COLORISTS TABLE-------------
async function buildBookColoristsTable() {
  console.log("STARTING TO BUILD bookColorists TABLE...");

  try {
    await client.query(`
      CREATE TABLE book_colorists (
        id SERIAL PRIMARY KEY,
        book_id INTEGER REFERENCES books(id),
        colorist_id INTEGER REFERENCES colorists(id),
        CONSTRAINT unique_book_colorist UNIQUE (book_id, colorist_id)
      );
    `);

    console.log("FINISHED BUILDING bookColorists TABLE!");
  } catch (error) {
    console.error("Error creating bookColorists table: " + error.message);
    throw error;
  }
}
//* --------------BUILD BOOK COLORISTS TABLE-------------

module.exports = {
  buildBookColoristsTable,
};
