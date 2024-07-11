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
  const {
    title,
    publish_date,
    description,
    print_length,
    series_volume,
    cover_image,
  } = req.body;

  try {
    if (
      !title ||
      !publish_date ||
      !description ||
      !print_length ||
      !series_volume ||
      !cover_image
    ) {
      console.log("IN ELSE IF");
      throw new MissingInformationErrorAPI(
        "You are missing information for the book in createBookAPI"
      );
    }
    let bookExists;
    console.log(title);
    try {
      let book_title = title;
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
