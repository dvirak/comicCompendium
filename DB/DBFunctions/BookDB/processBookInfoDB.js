const { formatAdditionalInfo } = require("../../../API/bookController/Helpers");
const { logErrorDB } = require("../../../Errors/DB");
const checkOrCreateItemDB = require("../MainFunctionsDB/checkOrCreateItemDB");
const { createRelationsDB } = require("../RelationFunctionsDB");
const { checkOrCreateBookDB, createAdditionalInfoDB } = require("./helpers");

async function processBookInfoDB(book_id, bookInfo) {
  console.log("IN PROCESS BOOK INFO DB");
  try {
    const {
      title,
      publish_date,
      description,
      print_length,
      series_volume,
      cover_image,
      ...relations
    } = bookInfo;

    let book = await checkOrCreateBookDB(
      title,
      publish_date,
      description,
      print_length,
      series_volume,
      cover_image
    );

    book_id = book_id ? book_id : book.id;

    let additionalInfo = await createAdditionalInfoDB(book_id, relations);

    let formattedInfo = formatAdditionalInfo(additionalInfo);

    let updatedBookInfo = { ...book, ...formattedInfo };
    return updatedBookInfo;
  } catch (error) {
    logErrorDB("processBookInfoDB", error);
    throw error;
  }
}

module.exports = processBookInfoDB;
