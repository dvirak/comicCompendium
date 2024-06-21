const getSingleBookDB = require("../../DB/DBFunctions/BookDB/GetBooksDB/getSingleBookDB");
const createBookDB = require("../../DB/DBFunctions/BookDB/createBookDB");
const {
  logErrorAPI,
  UserFeatureErrorAPI,
  ItemAlreadyExistsErrorAPI,
} = require("../../Errors/API");

async function createBookAPI(req, res, next) {
  console.log("IN CREATE BOOK API");

  if (!req.user) {
    throw new UserFeatureErrorAPI();
  }
  try {
    const bookExists = await getSingleBookDB(req.body.title);
    if (bookExists) {
      throw new ItemAlreadyExistsErrorAPI();
    } else {
      const createdBook = await createBookDB(req.body);

      res.send(createdBook);
    }
  } catch (error) {
    logErrorAPI("createBookAPI", error, next);
  }
}

module.exports = createBookAPI;
