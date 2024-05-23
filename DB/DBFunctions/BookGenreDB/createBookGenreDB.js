//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------CREATE BOOK GENRE DB-------------
async function createBookGenre({ genre_id, book_id }) {
  console.log(
    "CREATING BOOK GENRE: genre_id: " + genre_id + ", book_id:" + book_id
  );

  try {
    const {
      rows: [book_genre],
    } = await client.query(
      `
      INSERT INTO book_genres(genre_id, book_id)
      VALUES ($1, $2)
      ON CONFLICT ON CONSTRAINT unique_book_genre DO NOTHING
      RETURNING *
      `,
      [genre_id, book_id]
    );

    console.log(
      "CREATED BOOK GENRE: genre_id: " + genre_id + ", book_id: " + book_id
    );

    return book_genre;
  } catch (error) {
    console.error(
      `Error creating book genre with genre_id: ${genre_id} and book_id: ${book_id}: ${error}`
    );
    throw error;
  }
}
//* --------------CREATE BOOK GENRE DB-------------

module.exports = {
  createBookGenre,
};
