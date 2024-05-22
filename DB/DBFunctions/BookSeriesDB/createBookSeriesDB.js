//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------CREATE BOOK SERIES DB-------------
async function createBookSeries({ series_id, book_id }) {
  console.log(
    "CREATING BOOK SERIES: series_id: " + series_id + ", book_id:" + book_id
  );

  try {
    const {
      rows: [book_series],
    } = await client.query(
      `
      INSERT INTO book_series(series_id, book_id)
      VALUES ($1, $2)
      ON CONFLICT ON CONSTRAINT unique_book_series DO NOTHING
      RETURNING *
      `,
      [series_id, book_id]
    );

    console.log(
      "CREATED BOOK SERIES: series_id: " + series_id + ", book_id: " + book_id
    );

    return book_series;
  } catch (error) {
    console.error(
      `Error creating book series with series_id: ${series_id} and book_id: ${book_id}: ${error}`
    );
    throw error;
  }
}
//* --------------CREATE BOOK SERIES DB-------------

module.exports = {
  createBookSeries,
};
