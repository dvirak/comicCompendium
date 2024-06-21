// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../client");
// ! -----------------------------------------------------------

//* -----------------CREATE LETTERER DB---------------
/**
 * Creates a new letterer in the database with the provided letterer_name.
 *
 * @param {Object} lettererData - Object containing letterer data.
 * @param {string} lettererData.letterer_name - The name of the letterer.
 * @returns {Promise<Object>} A promise that resolves to the created letterer data.
 * @throws {Error} If an error occurs during the letterer creation process.
 *
 * @precondition lettererData is an object containing the letterer_name.
 * @postcondition The function returns a Promise that resolves to an object containing the created letterer data from the database.
 *                If an error occurs, the function throws an error.
 */
async function createLettererDB({ letterer_name }) {
  try {
    // Insert the letterer into the database, or do nothing if it already exists
    const {
      rows: [letterer],
    } = await client.query(
      `
      INSERT INTO letterers(letterer_name)
      VALUES ($1)
      ON CONFLICT (letterer_name) DO NOTHING
      RETURNING *
      `,
      [letterer_name]
    );

    // Return the created letterer data
    return letterer;
  } catch (error) {
    // Log the error for further handling
    logErrorDB("createLettererDB", error);
    throw error;
  }
}
//* -----------------CREATE LETTERER DB---------------

// Export the function for use by other modules.
module.exports = {
  createLettererDB,
};
