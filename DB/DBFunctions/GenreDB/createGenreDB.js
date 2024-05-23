//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------CREATE GENRE DB-------------
async function createGenreDB({ genre_name }) {
  console.log("CREATING GENRE IN DB: " + genre_name);

  try {
    const {
      rows: [genre],
    } = await client.query(
      `
      INSERT INTO genres(genre_name)
      VALUES ($1)
      ON CONFLICT (genre_name) DO NOTHING
      RETURNING *
      `,
      [genre_name]
    );

    console.log("CREATED GENRE IN DB: " + genre_name);

    return genre;
  } catch (error) {
    console.error(
      `Error creating genre in DB with name ${genre_name}: ${error}`
    );
    throw error;
  }
}
//* --------------CREATE GENRE DB-------------

module.exports = {
  createGenreDB,
};
