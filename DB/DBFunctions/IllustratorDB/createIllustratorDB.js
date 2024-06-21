// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../client");
// ! -----------------------------------------------------------

//* -----------------CREATE ILLUSTRATOR DB---------------
/**
 * Creates a new illustrator in the database with the provided illustrator_name.
 *
 * @param {Object} illustratorData - Object containing illustrator data.
 * @param {string} illustratorData.illustrator_name - The name of the illustrator.
 * @returns {Promise<Object>} A promise that resolves to the created illustrator data.
 * @throws {Error} If an error occurs during the illustrator creation process.
 *
 * @precondition illustratorData is an object containing the illustrator_name.
 * @postcondition The function returns a Promise that resolves to an object containing the created illustrator data from the database.
 *                If an error occurs, the function throws an error.
 */
async function createIllustratorDB({ illustrator_name }) {
  try {
    // Insert the illustrator into the database, or do nothing if it already exists
    const {
      rows: [illustrator],
    } = await client.query(
      `
      INSERT INTO illustrators(illustrator_name)
      VALUES ($1)
      ON CONFLICT (illustrator_name) DO NOTHING
      RETURNING *
      `,
      [illustrator_name]
    );

    // Return the created illustrator data
    return illustrator;
  } catch (error) {
    // Log the error for further handling
    logErrorDB("createIllustratorDB", error);
    throw error;
  }
}
//* -----------------CREATE ILLUSTRATOR DB---------------

// Export the function for use by other modules.
module.exports = {
  createIllustratorDB,
};
