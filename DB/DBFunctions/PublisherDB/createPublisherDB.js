// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../client");
// ! -----------------------------------------------------------

//* -----------------CREATE PUBLISHER DB---------------
/**
 * Creates a new publisher in the database with the provided publisher_name.
 *
 * @param {Object} publisherData - Object containing publisher data.
 * @param {string} publisherData.publisher_name - The name of the publisher.
 * @returns {Promise<Object>} A promise that resolves to the created publisher data.
 * @throws {Error} If an error occurs during the publisher creation process.
 *
 * @precondition publisherData is an object containing the publisher_name.
 * @postcondition The function returns a Promise that resolves to an object containing the created publisher data from the database.
 *                If an error occurs, the function throws an error.
 */
async function createPublisherDB({ publisher_name }) {
  try {
    // Insert the publisher into the database, or do nothing if it already exists
    const {
      rows: [publisher],
    } = await client.query(
      `
      INSERT INTO publishers(publisher_name)
      VALUES ($1)
      ON CONFLICT (publisher_name) DO NOTHING
      RETURNING *
      `,
      [publisher_name]
    );

    // Return the created publisher data
    return publisher;
  } catch (error) {
    // Log the error for further handling
    logErrorDB("createPublisherDB", error);
    throw error;
  }
}
//* -----------------CREATE PUBLISHER DB---------------

// Export the function for use by other modules.
module.exports = {
  createPublisherDB,
};
