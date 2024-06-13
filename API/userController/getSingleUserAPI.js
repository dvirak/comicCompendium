// ! ----------------- IMPORTED LIBRARIES --------------------------
const express = require("express");
// ! -----------------------------------------------------------

// ! ---------------- IMPORTED LOCAL FILES --------------------
const {
  getSingleUserDB,
} = require("../../DB/DBFunctions/UserDB/GetUsersDB/getSingleUserDB");
// ! -----------------------------------------------------------

/**
 * Handles GET requests to retrieve a single user based on either user_id or username.
 *
 * @param {Object} req - The request object, containing query parameters for user_id or username.
 * @param {Object} res - The response object, used to send back the desired user data or an error message.
 * @param {Function} next - The next middleware function in the request-response cycle.
 */
async function getSingleUserAPI(req, res, next) {
  console.log("IN GET SINGLE USER API");

  try {
    // Validate input
    if (!req.body.user_id && !req.body.username) {
      return next({
        status: 400,
        name: "ValidationError",
        message: "Either user_id or username must be provided.",
      });
    }

    // Call the database function to get the user data
    const user = await getSingleUserDB(req.body);

    if (!user) {
      return next({
        status: 404,
        name: "UserNotFoundError",
        message: "User not found.",
      });
    }

    // Send the user data as the response
    res.status(200).json(user);
  } catch (err) {
    // Handle errors and send an appropriate response
    next({
      status: 500,
      message: err.message,
    });
  }
}

module.exports = getSingleUserAPI;
