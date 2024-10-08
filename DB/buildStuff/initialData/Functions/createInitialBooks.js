const { createBookDB } = require("../../../DBFunctions/BookDB");
const { books } = require("../Data/bookData");

async function createInitialBooks() {
  console.log("CREATING INITIAL BOOKS...");

  try {
    // This method will guarantee proper order when seeding
    for (const book of books) {
      const newBook = await createBookDB(book);
    }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    // const createdBooks = await Promise.all(
    //   books.map((book) => createBook(book))
    // );

    console.log("FINISHED CREATING INITIAL BOOKS!");
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createInitialBooks,
};
