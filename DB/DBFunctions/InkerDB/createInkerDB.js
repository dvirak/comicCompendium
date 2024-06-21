// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../client");
// ! -----------------------------------------------------------

//* -----------------CREATE INKER DB---------------
/**
 * Creates a new inker in the database with the provided inker_name.
 *
 * @param {Object} inkerData - Object containing inker data.
 * @param {string} inkerData.inker_name - The name of the inker.
 * @returns {Promise<Object>} A promise that resolves to the created inker data.
 * @throws {Error} If an error occurs during the inker creation process.
 *
 * @precondition inkerData is an object containing the inker_name.
 * @postcondition The function returns a Promise that resolves to an object containing the created inker data from the database.
 *                If an error occurs, the function throws an error.
 */
async function createInkerDB({ inker_name }) {
  try {
    // Insert the inker into the database, or do nothing if it already exists
    const {
      rows: [inker],
    } = await client.query(
      `
      INSERT INTO inkers(inker_name)
      VALUES ($1)
      ON CONFLICT (inker_name) DO NOTHING
      RETURNING *
      `,
      [inker_name]
    );

    // Return the created inker data
    return inker;
  } catch (error) {
    // Log the error for further handling
    logErrorDB("createInkerDB", error);
    throw error;
  }
}
//* -----------------CREATE INKER DB---------------

// Export the function for use by other modules.
module.exports = {
  createInkerDB,
};
