// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../client");
// ! -----------------------------------------------------------

//* -----------------CREATE PENCILLER DB---------------
/**
 * Creates a new penciller in the database with the provided penciller_name.
 *
 * @param {Object} pencillerData - Object containing penciller data.
 * @param {string} pencillerData.penciller_name - The name of the penciller.
 * @returns {Promise<Object>} A promise that resolves to the created penciller data.
 * @throws {Error} If an error occurs during the penciller creation process.
 *
 * @precondition pencillerData is an object containing the penciller_name.
 * @postcondition The function returns a Promise that resolves to an object containing the created penciller data from the database.
 *                If an error occurs, the function throws an error.
 */
async function createPencillerDB({ penciller_name }) {
  try {
    // Insert the penciller into the database, or do nothing if it already exists
    const {
      rows: [penciller],
    } = await client.query(
      `
      INSERT INTO pencillers(penciller_name)
      VALUES ($1)
      ON CONFLICT (penciller_name) DO NOTHING
      RETURNING *
      `,
      [penciller_name]
    );

    // Return the created penciller data
    return penciller;
  } catch (error) {
    // Log the error for further handling
    logErrorDB("createPencillerDB", error);
    throw error;
  }
}
//* -----------------CREATE PENCILLER DB---------------

// Export the function for use by other modules.
module.exports = {
  createPencillerDB,
};
