//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------CREATE BOOK AUTHOR DB-------------
async function createBookAuthor({ author_id, book_id }) {
  console.log(
    "CREATING BOOK AUTHOR: author_id: " + author_id + ", book_id:" + book_id
  );

  try {
    const {
      rows: [book_author],
    } = await client.query(
      `
      INSERT INTO book_authors(author_id, book_id)
      VALUES ($1, $2)
      ON CONFLICT ON CONSTRAINT unique_book_author DO NOTHING
      RETURNING *
      `,
      [author_id, book_id]
    );

    console.log(
      "CREATED BOOK AUTHOR: author_id: " + author_id + ", book_id: " + book_id
    );

    return book_author;
  } catch (error) {
    console.error(
      `Error creating book author with author_id: ${author_id} and book_id: ${book_id}: ${error}`
    );
    throw error;
  }
}
//* --------------CREATE BOOK AUTHOR DB-------------

module.exports = {
  createBookAuthor,
};
