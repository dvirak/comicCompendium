//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------BUILD BOOK ILLUSTRATORS TABLE-------------
async function buildBookIllustratorsTable() {
  console.log("STARTING TO BUILD bookIllustrators TABLE...");

  try {
    await client.query(`
      CREATE TABLE book_illustrators (
        id SERIAL PRIMARY KEY,
        book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
        illustrator_id INTEGER REFERENCES illustrators(id) ON DELETE CASCADE,
        CONSTRAINT unique_book_illustrator UNIQUE (book_id, illustrator_id)
      );
    `);

    console.log("FINISHED BUILDING bookIllustrators TABLE!");
  } catch (error) {
    console.error("Error creating bookIllustrators table: " + error.message);
    throw error;
  }
}
//* --------------BUILD BOOK ILLUSTRATORS TABLE-------------

module.exports = {
  buildBookIllustratorsTable,
};
