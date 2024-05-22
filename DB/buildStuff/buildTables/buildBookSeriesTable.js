//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------BUILD BOOK SERIES TABLE-------------
async function buildBookSeriesTable() {
  console.log("STARTING TO BUILD bookSeries TABLE...");

  try {
    await client.query(`
      CREATE TABLE book_series (
        id SERIAL PRIMARY KEY,
        book_id INTEGER REFERENCES books(id),
        series_id INTEGER REFERENCES series(id),
        CONSTRAINT unique_book_series UNIQUE (book_id, series_id)
      );
    `);

    console.log("FINISHED BUILDING bookSeries TABLE!");
  } catch (error) {
    console.error("Error creating bookSeries table: " + error.message);
    throw error;
  }
}
//* --------------BUILD BOOK SERIES TABLE-------------

module.exports = {
  buildBookSeriesTable,
};
