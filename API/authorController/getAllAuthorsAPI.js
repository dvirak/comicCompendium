// ! ---------------- IMPORTED MODULES -------------------------
const logErrorAPI = require("../../Errors/API/logErrorAPI");
const { getAllAuthorsDB } = require("../../DB/DBFunctions/AuthorDB");
// ! -----------------------------------------------------------

/**
 * Description: API call to Retrieves all authors.
 * Method: GET
 * Route: /authors
 *
 * @returns {Promise<void>} This route does not return anything directly, but it sends a response containing basic author information.
 * @throws {Error} If an error occurs while retrieving basic author information from the database.
 *
 * @precondition None
 * @postcondition A response containing basic author information is sent to the client.
 */

async function getAllAuthorsAPI(req, res, next) {
  console.log("IN GET ALL AUTHORS API");

  try {
    // Calls the database function to get all authors
    const Authors = await getAllAuthorsDB(req, res);

    // Send list of authors as the response
    res.status(200).json(Authors);
  } catch (error) {
    // Handle errors and send an appropriate response
    logErrorAPI("getAllAuthorsAPI", error, next);
  }
}

module.exports = getAllAuthorsAPI;
