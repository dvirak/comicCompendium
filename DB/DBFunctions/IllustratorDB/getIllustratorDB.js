// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../client");
const {
  logErrorDB,
  MissingInformationErrorDB,
  NotFoundErrorDB,
} = require("../../../Errors/DB");
const { getIllustratorByIdDB, getIllustratorByNameDB } = require("./Helpers");
// ! -----------------------------------------------------------

// ------------GET ILLUSTRATOR FROM DATABASE------------
/**
 * Retrieves a single illustrator from the database based on the provided illustrator ID.
 *
 * @param {number} illustrator_id - The ID of the illustrator being retrieved.
 * @returns {Promise<Object>} A promise that resolves to the illustrator object.
 * @throws {Error} If an error occurs while querying the database or if the illustrator is not found.
 *
 * @precondition illustrator_id is provided and is a valid number.
 * @postcondition The function returns a Promise that resolves to an object containing the illustrator's data from the database.
 *                If an error occurs while querying the database, the function throws an error.
 */

async function getIllustratorDB({ illustrator_id, illustrator_name }) {
  console.log("IN GET ILLUSTRATOR DB");
  console.log(illustrator_name);

  try {
    if (!illustrator_id && !illustrator_name) {
      // Throw an error if neither illustrator_id nor illustrator_name is provided
      throw new MissingInformationErrorDB(
        "You must provided illustrator_id or illustrator_name"
      );
    }

    let illustrator;

    if (illustrator_id) {
      // Retrieve illustrator by illustrator_id if provided
      illustrator = await getIllustratorByIdDB(illustrator_id);
    } else if (illustrator_name) {
      // Retrieve book by illustrator_name if provided
      illustrator = await getIllustratorByNameDB(illustrator_name);
    }

    if (!illustrator) {
      // Throw an error if the book is not found
      throw new NotFoundErrorDB(
        "The Illustrator you are searching for was not found"
      );
    }

    // Return the first row from the fetched rows (illustrator).
    return illustrator;
  } catch (error) {
    // Throw the error for handling by the caller.
    logErrorDB("getIllustratorDB", error);
    throw error;
  }
}

// ------------GET BOOK'S ILLUSTRATOR FROM DATABASE------------

// Export the function for use by other modules.
module.exports = getIllustratorDB;
