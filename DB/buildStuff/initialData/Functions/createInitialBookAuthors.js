//! Imported Files --------------------------
const { bookAuthors } = require("../Data/bookAuthorData");
const {
  createBookAuthor,
} = require("../../../DBFunctions/BookAuthorDB/createBookAuthorDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL BOOK AUTHORS-------------
async function createInitialBookAuthors() {
  console.log("CREATING INITIAL BookAuthors...");

  try {
    // This method will guarantee proper order when seeding
    for (const bookAuthor of bookAuthors) {
      const newBookAuthor = await createBookAuthor(bookAuthor);
    }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    // const createdBookAuthor = await Promise.all(
    //   bookAuthors.map((bookAuthor) => createBookAuthor(bookAuthor))
    // );

    console.log("FINISHED CREATING INITIAL BookAuthors!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL BookAuthors: ` + error);
    throw error;
  }
}
//* --------------CREATE INITIAL BOOK AUTHORS-------------

module.exports = {
  createInitialBookAuthors,
};
