//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------CREATE BOOK ILLUSTRATOR DB-------------
async function createBookIllustrator({ illustrator_id, book_id }) {
  console.log(
    "CREATING BOOK ILLUSTRATOR: illustrator_id: " +
      illustrator_id +
      ", book_id:" +
      book_id
  );

  try {
    const {
      rows: [book_illustrator],
    } = await client.query(
      `
      INSERT INTO book_illustrators(illustrator_id, book_id)
      VALUES ($1, $2)
      ON CONFLICT ON CONSTRAINT unique_book_illustrator DO NOTHING
      RETURNING *
      `,
      [illustrator_id, book_id]
    );

    console.log(
      "CREATED BOOK ILLUSTRATOR: illustrator_id: " +
        illustrator_id +
        ", book_id: " +
        book_id
    );

    return book_illustrator;
  } catch (error) {
    console.error(
      `Error creating book illustrator with illustrator_id: ${illustrator_id} and book_id: ${book_id}: ${error}`
    );
    throw error;
  }
}
//* --------------CREATE BOOK ILLUSTRATOR DB-------------

module.exports = {
  createBookIllustrator,
};
