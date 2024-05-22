//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------BUILD BOOK LETTERERS TABLE-------------
async function buildBookLetterersTable() {
  console.log("STARTING TO BUILD bookLetterers TABLE...");

  try {
    await client.query(`
      CREATE TABLE book_letterers (
        id SERIAL PRIMARY KEY,
        book_id INTEGER REFERENCES books(id),
        letterer_id INTEGER REFERENCES letterers(id),
        CONSTRAINT unique_book_letterer UNIQUE (book_id, letterer_id)
      );
    `);

    console.log("FINISHED BUILDING bookLetterers TABLE!");
  } catch (error) {
    console.error("Error creating bookLetterers table: " + error.message);
    throw error;
  }
}
//* --------------BUILD BOOK LETTERERS TABLE-------------

module.exports = {
  buildBookLetterersTable,
};
