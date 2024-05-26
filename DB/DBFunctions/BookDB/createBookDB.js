//! Imported Libraries --------------------------
const { nextTick } = require("process");
const client = require("../../client");
//! ---------------------------------------------

//* --------------CREATE BOOK DB-------------
async function createBookDB({
  title,
  publish_date,
  description,
  print_length,
  series_volume,
  cover_image,
}) {
  console.log("CREATING BOOK IN DB: " + title);

  try {
    const {
      rows: [book],
    } = await client.query(
      `
      INSERT INTO books(title, publish_date, description, print_length, series_volume, cover_image)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (title) DO NOTHING
      RETURNING *
      `,
      [
        title,
        publish_date,
        description,
        print_length,
        series_volume,
        cover_image,
      ]
    );

    console.log("CREATED BOOK: " + title);

    return book;
  } catch (error) {
    console.error(`Error creating ${title}: ${error}`);
    throw error;
  }
}
//* --------------CREATE BOOK DB-------------

module.exports = {
  createBookDB,
};
