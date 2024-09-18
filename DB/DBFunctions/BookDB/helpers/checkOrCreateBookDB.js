const createBookDB = require("../createBookDB");
const { getSingleBookDB } = require("../GetBooksDB");

async function checkOrCreateBookDB(
  title,
  publish_date,
  description,
  print_length,
  series_volume,
  cover_image
) {
  console.log("IN CHECK OR CREATE BOOKE DB");
  console.log(title);
  let book = await getSingleBookDB({ title });

  if (!book) {
    book = await createBookDB(
      title,
      publish_date,
      description,
      print_length,
      series_volume,
      cover_image
    );
  }
  console.log(book);
  return book;
}

module.exports = checkOrCreateBookDB;
