// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../client");
// ! -----------------------------------------------------------

//* -----------------CREATE GENRE DB---------------
/**
 * Creates a new genre in the database with the provided genre_name.
 *
 * @param {Object} genreData - Object containing genre data.
 * @param {string} genreData.genre_name - The name of the genre.
 * @returns {Promise<Object>} A promise that resolves to the created genre data.
 * @throws {Error} If an error occurs during the genre creation process.
 *
 * @precondition genreData is an object containing the genre_name.
 * @postcondition The function returns a Promise that resolves to an object containing the created genre data from the database.
 *                If an error occurs, the function throws an error.
 */
async function createGenreDB({ genre_name }) {
  try {
    // Insert the genre into the database, or do nothing if it already exists
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

    // Return the created genre data
    return genre;
  } catch (error) {
    // Log the error for further handling
    logErrorDB("createGenreDB", error);
    throw error;
  }
}
//* -----------------CREATE GENRE DB---------------

// Export the function for use by other modules.
module.exports = {
  createGenreDB,
};
