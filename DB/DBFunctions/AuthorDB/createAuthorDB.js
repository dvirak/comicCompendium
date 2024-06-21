// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../client");
// ! -----------------------------------------------------------

//* -----------------CREATE AUTHOR DB---------------
/**
 * Creates a new author in the database with the provided author name.
 *
 * @param {Object} authorData - Object containing author data.
 * @param {string} authorData.author_name - The name of the author to create.
 * @returns {Promise<Object>} A promise that resolves to the created author data.
 * @throws {Error} If an error occurs during the author creation process.
 *
 * @precondition authorData is an object containing the author_name.
 * @postcondition The function returns a Promise that resolves to an object containing the created author data from the database.
 *                If an error occurs, the function throws an error.
 */
async function createAuthorDB({ author_name }) {
  console.log("CREATING AUTHOR: " + author_name);

  try {
    // Insert the author into the database, or do nothing if the author already exists
    const {
      rows: [author],
    } = await client.query(
      `
      INSERT INTO authors(author_name)
      VALUES ($1)
      ON CONFLICT (author_name) DO NOTHING
      RETURNING *
      `,
      [author_name]
    );

    console.log("CREATED AUTHOR: " + author_name);

    // Return the created author data
    return author;
  } catch (error) {
    // Log the error for further handling
    logErrorDB("createAuthorDB", error);
    throw error;
  }
}
//* -----------------CREATE AUTHOR DB---------------

// Export the function for use by other modules.
module.exports = {
  createAuthorDB,
};
