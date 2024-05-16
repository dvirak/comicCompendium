//! Imported Libraries --------------------------
const { nextTick } = require("process");
const client = require("./client");
// const { requireUser } = require('/utils');
//! ---------------------------------------------

//* --------------CREATE PRODUCT Db-------------
async function createBook({
  id,
  title,
  author,
  illustrator,
  penciler,
  inker,
  colorist,
  letterer,
  publisher,
  publish_date,
  description,
  print_length,
  genre1,
  genre2,
  genre3,
  series_name,
  series_volume,
  cover_image,
}) {
  console.log("CREATING BOOK: " + title);
  try {
    const {
      rows: [book],
    } = await client.query(
      `
      INSERT INTO books(id,
  title,
  author,
  illustrator,
  penciler,
  inker,
  colorist,
  letterer,
  publisher,
  publish_date,
  description,
  print_length,
  genre1,
  genre2,
  genre3,
  series_name,
  series_volume,
  cover_image)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      ON CONFLICT (title) DO NOTHING
      RETURNING *;
      `,
      [
        id,
        title,
        author,
        illustrator,
        penciler,
        inker,
        colorist,
        letterer,
        publisher,
        publish_date,
        description,
        print_length,
        genre1,
        genre2,
        genre3,
        series_name,
        series_volume,
        cover_image,
      ]
    );
    console.log("SUCCESSFULLY CREATED BOOK: " + title);
    return book;
  } catch (error) {
    console.log(
      `Error occurred in the createProduct Db Call for ${title}, ${error}`
    );
    throw error;
  }
}
//* --------------CREATE PRODUCT Db-------------

module.exports = {
  createBook,
};
