const { processBookInfoDB } = require("../../DB/DBFunctions/BookDB");
const { logErrorAPI } = require("../../Errors/API");

async function createOrUpdateBookAPI(req, res, next) {
  let bookInfo = req.body;

  if (!bookInfo)
    throw new MissingInformationErrorAPI(
      "You are missing information for the book in createOrUpdateBookAPI"
    );

  try {
    let book = await processBookInfoDB(bookInfo);
    res.send(book);
  } catch (error) {
    logErrorAPI("createOrUpdateBookAPI", error);
    throw error;
  }
}

module.exports = createOrUpdateBookAPI;
