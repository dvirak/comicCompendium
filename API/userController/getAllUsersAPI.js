// ! ----------------- IMPORTED FILES --------------------------
const express = require("express");
const router = express.Router();
// ! -----------------------------------------------------------

// ! ---------- IMPORTED COMPONENTS/VARIABLES -------------------
const {
  getAllUsersDB,
} = require("../../DB/DBFunctions/UserDB/GetUsersDB/getAllUsersDB");
// ! -----------------------------------------------------------

/**
 * Description: Retrieves basic information for all users.
 * Method: GET
 * Route: /users
 *
 * @returns {Promise<void>} This route does not return anything directly, but it sends a response containing all users information.
 * @throws {Error} If an error occurs while retrieving all user information from the database.
 *
 * @precondition None
 * @postcondition A response containing all user information is sent to the client.
 */

async function getAllUsersAPI(req, res) {
  console.log("IN GET ALL USERS API");
  try {
    const basicUsers = await getAllUsersDB(req, res);

    // Send list of books as the response
    res.status(200).json(basicUsers);
  } catch (error) {
    console.error("Error in getAllUsersAPI: " + error);
    next({
      status: error.status || 500,
      name: error.name,
      message: error.message,
    });
  }
}

module.exports = getAllUsersAPI;
