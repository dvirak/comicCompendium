// ! ----------------- IMPORTED FILES --------------------------
const { logErrorDB, NotFoundErrorDB } = require("../../../../Errors/DB");
const client = require("../../../client");
// ! -----------------------------------------------------------

// ------------GET SINGLE AUTHOR BY NAME FROM DATABASE------------
/**
 * Retrieves a single illustrator from the database based on the provided illustrator name.
 *
 * @param {string} illustrator_name - The name of the illustrator to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the illustrator object.
 * @throws {Error} If an error occurs while querying the database or if the illustrator is not found.
 *
 * @precondition illustrator_name is provided and is a valid string.
 * @postcondition The function returns a Promise that resolves to an object containing the illustrator data from the database.
 *                If an error occurs while querying the database, the function throws an error.
 */

async function getIllustratorByNameDB(illustrator_name) {
  const query = `
    SELECT *
    FROM illustrators
    WHERE illustrator_name ILIKE $1
  `;

  try {
    // Execute the query to select the illustrator from the 'illustrators' table where the illustrator_name matches the provided illustrator_name.
    const { rows } = await client.query(query, [illustrator_name]);

    // If no rows are returned, throw an error indicating the illustrator was not found.
    if (rows.length === 0) {
      throw new NotFoundErrorDB(
        "The Illustrator you are searching for was not found"
      );
    }

    // Return the first row from the fetched rows (illustrator).
    return rows[0];
  } catch (error) {
    // Throw the error for handling by the caller.
    logErrorDB("getIllustratorByNameDB", error);
    throw error;
  }
}

// ------------GET SINGLE AUTHOR BY NAME FROM DATABASE------------

// Export the function for use by other modules.
module.exports = getIllustratorByNameDB;
