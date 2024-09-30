const createBookDB = require("../createBookDB");
const { getSingleBookDB } = require("../GetBooksDB");
const updateBookDB = require("../updateBookDB");

async function checkOrCreateBookDB(book_id, basicInfo) {
  console.log("IN CHECK OR CREATE BOOKE DB");
  let title = basicInfo.title;
  let book = book_id
    ? await getSingleBookDB({ book_id })
    : await getSingleBookDB({ title });

  Object.keys(basicInfo).forEach(
    (key) => !basicInfo[key] && delete basicInfo[key]
  );

  const hasBasicInfo = Object.keys(basicInfo).length > 0;

  if (!book) {
    book = await createBookDB(basicInfo);
  } else if (book && hasBasicInfo) {
    book = await updateBookDB(book.id, basicInfo);
  }
  console.log(book);
  return book;
}

module.exports = checkOrCreateBookDB;
