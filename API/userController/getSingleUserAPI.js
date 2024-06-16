// ! ----------------- IMPORTED LIBRARIES --------------------------
const express = require("express");
// ! ---------------------------------------------------------------

// ! ---------------- IMPORTED LOCAL FILES -------------------------
const {
  getSingleUserDB,
} = require("../../DB/DBFunctions/UserDB/GetUsersDB/getSingleUserDB");
const {
  UserNotFoundErrorAPI,
  InputErrorUsersAPI,
  logErrorAPI,
} = require("../../Errors/API");
// ! ---------------------------------------------------------------

/**
 * Handles GET requests to retrieve a single user based on either user_id or username.
 *
 * @param {Object} req - The request object, containing parameters for user_id or query parameters for username.
 * @param {Object} res - The response object, used to send back the desired user data or an error message.
 * @param {Function} next - The next middleware function in the request-response cycle.
 */
async function getSingleUserAPI(req, res, next) {
  console.log("IN GET SINGLE USER API");
  const user_id = req.params.user_id;
  const username = req.query.username;

  try {
    // Validate input: Ensure either user_id or username is provided
    if (!user_id && !username) {
      throw new InputErrorUsersAPI();
    }

    // Call the database function to get the user data based on user_id or username
    const user = user_id
      ? await getSingleUserDB({ user_id })
      : await getSingleUserDB({ username });

    // If user is not found, throw a UserNotFoundErrorAPI
    if (!user) {
      throw new UserNotFoundErrorAPI();
    }

    // Send the user data as the response
    res.status(200).json(user);
  } catch (error) {
    // Handle errors and send an appropriate response
    logErrorAPI("getSingleUserAPI", error, next);
  }
}

module.exports = getSingleUserAPI;
