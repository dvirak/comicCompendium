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

async function getAllUsersAPI(req, res, next) {
  console.log("IN GET ALL USERS API");
  try {
    const rawData = await getAllUsersDB();
    const allUsers = JSON.stringify(rawData);
    res.send(allUsers);
  } catch ({ title, message }) {
    console.log("Error in GET ALL USERS API: " + title + "Message: " + message);
    next({
      error: err,
      message: "Failed GET ALL USERS API.",
    });
    throw error;
  }
}

module.exports = getAllUsersAPI;
