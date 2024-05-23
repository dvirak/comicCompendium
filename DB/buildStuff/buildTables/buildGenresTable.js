//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------BUILD GENRES TABLE-------------
async function buildGenresTable() {
  console.log("STARTING TO BUILD Genres TABLE...");

  try {
    await client.query(`
      CREATE TABLE genres (
        id SERIAL PRIMARY KEY,
        genre_name VARCHAR(255) UNIQUE
      );
    `);

    console.log("FINISHED BUILDING GENRES TABLE!");
  } catch (error) {
    console.error("Error creating Genres table: " + error.message);
    throw error;
  }
}
//* --------------BUILD GENRES TABLE-------------

module.exports = {
  buildGenresTable,
};
