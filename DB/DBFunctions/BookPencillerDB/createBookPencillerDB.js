//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------CREATE BOOK PENCILLER DB-------------
async function createBookPencillerDB({ penciller_id, book_id }) {
  console.log(
    "CREATING BOOK PENCILLER IN DB: penciller_id: " +
      penciller_id +
      ", book_id:" +
      book_id
  );

  try {
    const {
      rows: [book_penciller],
    } = await client.query(
      `
      INSERT INTO book_pencillers(penciller_id, book_id)
      VALUES ($1, $2)
      ON CONFLICT ON CONSTRAINT unique_book_penciller DO NOTHING
      RETURNING *
      `,
      [penciller_id, book_id]
    );

    console.log(
      "CREATED BOOK PENCILLER IN DB: penciller_id: " +
        penciller_id +
        ", book_id: " +
        book_id
    );

    return book_penciller;
  } catch (error) {
    console.error(
      `Error creating book penciller in DB with penciller_id: ${penciller_id} and book_id: ${book_id}: ${error}`
    );
    throw error;
  }
}
//* --------------CREATE BOOK PENCILLER DB-------------

module.exports = {
  createBookPencillerDB,
};
