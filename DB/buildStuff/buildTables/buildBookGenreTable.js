//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------BUILD BOOK GENRES TABLE-------------
async function buildBookGenresTable() {
  console.log("STARTING TO BUILD bookGenres TABLE...");

  try {
    await client.query(`
      CREATE TABLE book_genres (
        id SERIAL PRIMARY KEY,
        book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
        genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE,
        CONSTRAINT unique_book_genre UNIQUE (book_id, genre_id)
      );
    `);

    console.log("FINISHED BUILDING bookGenres TABLE!");
  } catch (error) {
    console.error("Error creating bookGenres table: " + error.message);
    throw error;
  }
}
//* --------------BUILD BOOK GENRES TABLE-------------

module.exports = {
  buildBookGenresTable,
};
