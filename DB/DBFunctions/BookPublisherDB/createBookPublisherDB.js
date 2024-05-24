//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------CREATE BOOK PUBLISHER DB-------------
async function createBookPublisherDB({ publisher_id, book_id }) {
  console.log(
    "CREATING BOOK PUBLISHER IN DB: publisher_id: " +
      publisher_id +
      ", book_id:" +
      book_id
  );

  try {
    const {
      rows: [book_publisher],
    } = await client.query(
      `
      INSERT INTO book_publishers(publisher_id, book_id)
      VALUES ($1, $2)
      ON CONFLICT ON CONSTRAINT unique_book_publisher DO NOTHING
      RETURNING *
      `,
      [publisher_id, book_id]
    );

    console.log(
      "CREATED BOOK PUBLISHER IN DB: publisher_id: " +
        publisher_id +
        ", book_id: " +
        book_id
    );

    return book_publisher;
  } catch (error) {
    console.error(
      `Error creating book publisher in db with publisher_id: ${publisher_id} and book_id: ${book_id}: ${error}`
    );
    throw error;
  }
}
//* --------------CREATE BOOK PUBLISHER DB-------------

module.exports = {
  createBookPublisherDB,
};
