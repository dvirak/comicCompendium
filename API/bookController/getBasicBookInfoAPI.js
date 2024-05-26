//! Imported Libraries --------------------------
const express = require("express");
const router = express.Router();
//! ---------------------------------------------

//! Imported Components/Variables----------------
const {
  getBasicBookInfoDB,
} = require("../../DB/DBFunctions/BookDB/getBasicBookInfoDB");
//! ---------------------------------------------

//* -----------------GET BASIC BOOK INFO API-----------------
router.get("/", async (req, res, next) => {
  console.log("IN GET BASIC BOOK INFO API");
  try {
    const rawData = await getBasicBookInfoDB();
    const basicBooks = JSON.stringify(rawData);
    res.send(basicBooks);
  } catch ({ title, message }) {
    console.log(
      "Error in GET BASIC BOOK INFO API: " + title + "Message: " + message
    );
    next({
      error: err,
      message: "Failed to fetch basic book info API.",
    });
    throw error;
  }
});
//* -----------------GET BASIC BOOK INFO API-----------------

module.exports = router;
