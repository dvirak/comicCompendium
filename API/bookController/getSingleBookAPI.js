// ! ----------------- IMPORTED FILES --------------------------
const express = require("express");
// ! -----------------------------------------------------------

// ! ---------------- IMPORTED MODULES -------------------------
const {
  getSingleBookDB,
} = require("../../DB/DBFunctions/BookDB/getBooksDB/getSingleBookDB");
// ! -----------------------------------------------------------

/**
 * Handles GET requests to retrieve a single book based on either book_id or book_name.
 *
 * @param {Object} req - The request object, containing query parameters for book_id or book_name.
 * @param {Object} res - The response object, used to send back the desired book data or an error message.
 */
async function getSingleBookAPI(req, res) {
  const { book_id, book_title } = req.body;

  console.log("IN GET SINGLE BOOK API");

  try {
    // Validate input
    if (!book_id && !book_title) {
      return res
        .status(400)
        .json({ error: "Either book_id or book_title must be provided." });
    }

    // Call the database function to get the book data
    const book = await getSingleBookDB(book_id, book_title);

    // Send the book data as the response
    res.status(200).json(book);
  } catch (err) {
    // Handle errors and send an appropriate response
    res.status(500).json({ error: err.message });
  }
}

module.exports = getSingleBookAPI;
