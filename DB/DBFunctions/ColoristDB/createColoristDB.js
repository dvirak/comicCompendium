// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../client");
// ! -----------------------------------------------------------

//* -----------------CREATE COLORIST DB---------------
/**
 * Creates a new colorist in the database with the provided colorist_name.
 *
 * @param {Object} coloristData - Object containing colorist data.
 * @param {string} coloristData.colorist_name - The name of the colorist.
 * @returns {Promise<Object>} A promise that resolves to the created colorist data.
 * @throws {Error} If an error occurs during the colorist creation process.
 *
 * @precondition coloristData is an object containing the colorist_name.
 * @postcondition The function returns a Promise that resolves to an object containing the created colorist data from the database.
 *                If an error occurs, the function throws an error.
 */
async function createColoristDB({ colorist_name }) {
  try {
    // Insert the colorist into the database, or do nothing if it already exists
    const {
      rows: [colorist],
    } = await client.query(
      `
      INSERT INTO colorists(colorist_name)
      VALUES ($1)
      ON CONFLICT (colorist_name) DO NOTHING
      RETURNING *
      `,
      [colorist_name]
    );

    // Return the created colorist data
    return colorist;
  } catch (error) {
    // Log the error for further handling
    logErrorDB("createColoristDB", error);
    throw error;
  }
}
//* -----------------CREATE COLORIST DB---------------

// Export the function for use by other modules.
module.exports = {
  createColoristDB,
};
