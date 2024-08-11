// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../../client");
const { logErrorDB, NotFoundErrorDB } = require("../../../../Errors/DB");

// ! -----------------------------------------------------------

// ------------GET SINGLE ILLUSTRATOR BY ID FROM DATABASE------------
/**
 * Retrieves a single illustrator from the database based on the provided illustrator ID.
 *
 * @param {number} illustrator_id - The ID of the illustrator to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the illustrator object.
 * @throws {Error} If an error occurs while querying the database or if the illustrator is not found.
 *
 * @precondition illustrator_id is provided and is a valid number.
 * @postcondition The function returns a Promise that resolves to an object containing the illustrator data from the database.
 *                If an error occurs while querying the database, the function throws an error.
 */

async function getIllustratorByIdDB(illustrator_id) {
  const query = `
    SELECT *
    FROM illustrators
    WHERE id = $1
  `;

  try {
    // Execute the query to select the illustrator from the 'illustrators' table where the ID matches the provided illustrator_id.
    const { rows } = await client.query(query, [illustrator_id]);

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
    logErrorDB("getIllustratorByIdDB", error);
    throw error;
  }
}

// ------------GET SINGLE ILLUSTRATOR BY ID FROM DATABASE------------

// Export the function for use by other modules.
module.exports = getIllustratorByIdDB;
