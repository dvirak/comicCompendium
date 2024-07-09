const getSingleBookDB = require("../../DB/DBFunctions/BookDB/GetBooksDB/getSingleBookDB");
const createBookDB = require("../../DB/DBFunctions/BookDB/createBookDB");
const {
  logErrorAPI,
  UserFeatureErrorAPI,
  ItemAlreadyExistsErrorAPI,
  MissingInformationErrorAPI,
} = require("../../Errors/API");
const { BookNotFoundErrorDB } = require("../../Errors/DB");

async function createBookAPI(req, res, next) {
  console.log("IN CREATE BOOK API");
  console.log(req.publish_date);

  if (!req.user) {
    throw new UserFeatureErrorAPI();
  } else if (
    !req.body.title ||
    !req.body.publish_date ||
    !req.body.description ||
    !req.body.print_length ||
    !req.body.series_volume ||
    !req.body.cover_image
  ) {
    console.log("IN ELSE IF");
    throw new MissingInformationErrorAPI(
      "You are missing information for the book in createBookAPI"
    );
  }
  try {
    const book_title = req.body.title;

    let bookExists;
    try {
      bookExists = await getSingleBookDB({ book_title });
    } catch (error) {
      if (error instanceof BookNotFoundErrorDB) {
        bookExists = null;
      } else {
        throw error;
      }
    }

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
