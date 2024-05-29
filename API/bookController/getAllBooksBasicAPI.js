// ! ----------------- IMPORTED FILES --------------------------
const express = require("express");
const router = express.Router();
// ! -----------------------------------------------------------

// ! ---------- IMPORTED COMPONENTS/VARIABLES -------------------
const {
  getAllBooksBasicDB,
} = require("../../DB/DBFunctions/BookDB/getAllBooksBasicDB");
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

router.get("/", async (req, res, next) => {
  console.log("IN GET ALL BOOKS BASIC API");
  try {
    const rawData = await getAllBooksBasicDB();
    const basicBooks = JSON.stringify(rawData);
    res.send(basicBooks);
  } catch ({ title, message }) {
    console.log(
      "Error in GET ALL BOOKS BASIC API: " + title + "Message: " + message
    );
    next({
      error: err,
      message: "Failed GET ALL BOOKS BASIC API.",
    });
    throw error;
  }
});

module.exports = router;
