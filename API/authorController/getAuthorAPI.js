// ! ----------------- IMPORTED LIBRARIES --------------------------
const express = require("express");
// ! ---------------------------------------------------------------

// ! ---------------- IMPORTED LOCAL FILES -------------------------
const {
  AuthorNotFoundErrorAPI,
  InputErrorAuthorsAPI,
  logErrorAPI,
} = require("../../Errors/API");
const { getAuthorDB } = require("../../DB/DBFunctions/AuthorDB");
// ! ---------------------------------------------------------------

/**
 * Handles GET requests to retrieve a single author based on either author_id or author_name.
 *
 * @param {Object} req - The request object, containing parameters for author_id or query parameters for author_name.
 * @param {Object} res - The response object, used to send back the desired author data or an error message.
 * @param {Function} next - The next middleware function in the request-response cycle.
 */
async function getAuthorAPI(req, res, next) {
  console.log("IN GET AUTHOR API");
  const author_id = req.params.author_id;
  const author_name = req.query.author_name;

  try {
    // Validate input: Ensure either author_id or author_name is provided
    if (!author_id && !author_name) {
      throw new InputErrorAuthorsAPI();
    }

    // Call the database function to get the author data based on author_id or author_name
    const author = author_id
      ? await getAuthorDB({ author_id })
      : await getAuthorDB({ author_name });

    // If author is not found, throw a AuthorNotFoundErrorAPI
    if (!author) {
      throw new AuthorNotFoundErrorAPI();
    }

    // Send the author data as the response
    res.status(200).json(author);
  } catch (error) {
    // Handle errors and send an appropriate response
    logErrorAPI("getAuthorAPI", error, next);
  }
}

module.exports = getAuthorAPI;
