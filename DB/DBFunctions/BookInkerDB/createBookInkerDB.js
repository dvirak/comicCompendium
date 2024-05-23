//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------CREATE BOOK INKER DB-------------
async function createBookInkerDB({ inker_id, book_id }) {
  console.log(
    "CREATING BOOK INKER IN DB: inker_id: " + inker_id + ", book_id:" + book_id
  );

  try {
    const {
      rows: [book_inker],
    } = await client.query(
      `
      INSERT INTO book_inkers(inker_id, book_id)
      VALUES ($1, $2)
      ON CONFLICT ON CONSTRAINT unique_book_inker DO NOTHING
      RETURNING *
      `,
      [inker_id, book_id]
    );

    console.log(
      "CREATED BOOK INKER IN DB: inker_id: " +
        inker_id +
        ", book_id: " +
        book_id
    );

    return book_inker;
  } catch (error) {
    console.error(
      `Error creating book inker in DB with inker_id: ${inker_id} and book_id: ${book_id}: ${error}`
    );
    throw error;
  }
}
//* --------------CREATE BOOK INKER DB-------------

module.exports = {
  createBookInkerDB,
};
