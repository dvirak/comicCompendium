//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------CREATE BOOK LETTERER DB-------------
async function createBookLettererDB({ letterer_id, book_id }) {
  console.log(
    "CREATING BOOK LETTERER IN DB: letterer_id: " +
      letterer_id +
      ", book_id:" +
      book_id
  );

  try {
    const {
      rows: [book_letterer],
    } = await client.query(
      `
      INSERT INTO book_letterers(letterer_id, book_id)
      VALUES ($1, $2)
      ON CONFLICT ON CONSTRAINT unique_book_letterer DO NOTHING
      RETURNING *
      `,
      [letterer_id, book_id]
    );

    console.log(
      "CREATED BOOK LETTERER IN DB: letterer_id: " +
        letterer_id +
        ", book_id: " +
        book_id
    );

    return book_letterer;
  } catch (error) {
    console.error(
      `Error creating book letterer in DB with letterer_id: ${letterer_id} and book_id: ${book_id}: ${error}`
    );
    throw error;
  }
}
//* --------------CREATE BOOK LETTERER DB-------------

module.exports = {
  createBookLettererDB,
};
