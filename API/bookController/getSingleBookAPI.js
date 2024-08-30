// ! ----------------- IMPORTED LIBRARIES --------------------------
const express = require("express");

// ! ---------------- IMPORTED LOCAL MODULES -------------------------
const {
  InputErrorBooksAPI,
  logErrorAPI,
  BookNotFoundErrorAPI,
} = require("../../Errors/API");
const { getSingleBookDB } = require("../../DB/DBFunctions/BookDB/GetBooksDB/");
const {
  formatBookPublishDatesAPI,
  formatAdditionalInfo,
} = require("./Helpers");
const getRelationItemsDB = require("../../DB/DBFunctions/RelationFunctionsDB/getRelationItemsDB");
// ! -----------------------------------------------------------

/**
 * Handles GET requests to retrieve a single book based on either book_id or book_name.
 *
 * @param {Object} req - The request object, containing query parameters for book_id or book_name.
 * @param {Object} res - The response object, used to send back the desired book data or an error message.
 */
async function getSingleBookAPI(req, res, next) {
  const book_id = req.params.book_id;
  const title = req.query.title;
  const relations = [
    "publisher",
    "series",
    "author",
    "illustrator",
    "colorist",
    "inker",
    "letterer",
    "penciller",
    "genre",
  ];
  console.log(req.query);

  console.log("IN GET SINGLE BOOK API");

  try {
    // Validate input
    if (!book_id && !title) {
      throw new InputErrorBooksAPI();
    }

    // Call the database function to get the book data
    let book = book_id
      ? await getSingleBookDB({ book_id })
      : await getSingleBookDB({ title });

    if (!book) {
      throw new BookNotFoundErrorAPI();
    }

    // Ensure publish_date is properly formatted for return
    book = formatBookPublishDatesAPI(book);

    const additionalInfo = await getRelationItemsDB({
      main_item: "book",
      main_item_id: book.id,
      relations,
    });

    let formattedInfo = formatAdditionalInfo(additionalInfo);

    // Send the book data as the response
    res.status(200).json({ ...book, ...formattedInfo });
  } catch (error) {
    // Handle errors and send an appropriate response
    logErrorAPI("getSingleBookAPI", error, next);
  }
}

module.exports = getSingleBookAPI;
