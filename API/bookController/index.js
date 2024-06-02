// ! ----------------- IMPORTED FILES --------------------------
const express = require("express");
// ! -----------------------------------------------------------

const booksRouter = express.Router();

/**
 * Description: Retrieves basic information for all books.
 * Method: GET
 * Route: /books/all-books-basic-info
 */
const getAllBooksBasicAPI = require("./getAllBooksBasicAPI");
booksRouter.get("/", getAllBooksBasicAPI);

const getSingleBookAPI = require("./getSingleBookAPI");
booksRouter.get("/:type?", async (req, res) => {
  // Log the received request
  console.log(
    `Received GET request at /books${
      req.params.type ? `/${req.params.type}` : ""
    }`
  );

  // Check if the request is for /books or /books/book
  if (!req.params.type || req.params.type === "book") {
    // Call the function to handle the single book API
    await getSingleBookAPI(req, res);
  } else {
    // Handle other routes if needed
    res.status(404).json({ error: "Route not found" });
  }
});

module.exports = booksRouter;
