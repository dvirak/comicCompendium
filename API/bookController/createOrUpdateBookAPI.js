const { processBookInfoDB } = require("../../DB/DBFunctions/BookDB");
const { logErrorAPI } = require("../../Errors/API");

async function createOrUpdateBookAPI(req, res, next) {
  let bookInfo = req.body;
  let book_id = req.params.book_id;
  console.log(book_id);

  if (!bookInfo)
    throw new MissingInformationErrorAPI(
      "You are missing information for the book in createOrUpdateBookAPI"
    );

  try {
    let book = await processBookInfoDB(book_id, bookInfo);
    res.send(book);
  } catch (error) {
    logErrorAPI("createOrUpdateBookAPI", error, next);
    throw error;
  }
}

module.exports = createOrUpdateBookAPI;
