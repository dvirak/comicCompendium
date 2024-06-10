// ! ----------------- IMPORTED LIBRARIES --------------------------
const express = require("express");
// ! -----------------------------------------------------------

// ! ---------------- IMPORTED LOCAL FILES --------------------
const {
  getSingleUserDB,
} = require("../../DB/DBFunctions/UserDB/GetUsersDB/getSingleUserDB");
// ! -----------------------------------------------------------

/**
 * Handles GET requests to retrieve a single user based on either user_id or user_name.
 *
 * @param {Object} req - The request object, containing query parameters for user_id or user_name.
 * @param {Object} res - The response object, used to send back the desired user data or an error message.
 */
async function getSingleUserAPI(req, res) {
  console.log("IN GET SINGLE USER API");

  try {
    // Validate input
    if (!req.body.user_id && !req.body.username) {
      return res
        .status(400)
        .json({ error: "Either user_id or username must be provided." });
    }

    // Call the database function to get the user data
    const user = await getSingleUserDB(req.body);

    // Send the user data as the response
    res.status(200).json(user);
  } catch (err) {
    // Handle errors and send an appropriate response
    res.status(500).json({ error: err.message });
  }
}

module.exports = getSingleUserAPI;
