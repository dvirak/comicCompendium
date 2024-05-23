//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------CREATE BOOK COLORIST DB-------------
async function createBookColoristDB({ colorist_id, book_id }) {
  console.log(
    "CREATING BOOK COLORIST IN DB: colorist_id: " +
      colorist_id +
      ", book_id:" +
      book_id
  );

  try {
    const {
      rows: [book_colorist],
    } = await client.query(
      `
      INSERT INTO book_colorists(colorist_id, book_id)
      VALUES ($1, $2)
      ON CONFLICT ON CONSTRAINT unique_book_colorist DO NOTHING
      RETURNING *
      `,
      [colorist_id, book_id]
    );

    console.log(
      "CREATED BOOK COLORIST: colorist_id: " +
        colorist_id +
        ", book_id: " +
        book_id
    );

    return book_colorist;
  } catch (error) {
    console.error(
      `Error creating book colorist with colorist_id: ${colorist_id} and book_id: ${book_id}: ${error}`
    );
    throw error;
  }
}
//* --------------CREATE BOOK COLORIST DB-------------

module.exports = {
  createBookColoristDB,
};
