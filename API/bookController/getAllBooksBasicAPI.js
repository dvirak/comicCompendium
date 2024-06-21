// ! ----------------- IMPORTED FILES --------------------------
const express = require("express");
const router = express.Router();
// ! -----------------------------------------------------------

// ! ---------------- IMPORTED MODULES -------------------------
const logErrorAPI = require("../../Errors/API/logErrorAPI");
const {
  getAllBooksBasicDB,
} = require("../../DB/DBFunctions/BookDB/GetBooksDB");
// ! -----------------------------------------------------------

/**
 * Description: Retrieves basic information for all books.
 * Method: GET
 * Route: /books
 *
 * @returns {Promise<void>} This route does not return anything directly, but it sends a response containing basic book information.
 * @throws {Error} If an error occurs while retrieving basic book information from the database.
 *
 * @precondition None
 * @postcondition A response containing basic book information is sent to the client.
 */

async function getAllBooksBasicAPI(req, res, next) {
  console.log("IN GET ALL BOOKS BASIC API");

  try {
    // Calls the database function to get all books
    const basicBooks = await getAllBooksBasicDB(req, res);

    // Send list of books as the response
    res.status(200).json(basicBooks);
  } catch (error) {
    // Handle errors and send an appropriate response
    logErrorAPI("getAllBooksBasicAPI", error, next);
  }
}

module.exports = getAllBooksBasicAPI;
