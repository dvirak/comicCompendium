//! Imported Files --------------------------
const { authors } = require("../Data/authorData");
const {
  createAuthor,
} = require("../../../DBFunctions/AuthorDB/createAuthorDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL AUTHORS-------------
async function createInitialAuthors() {
  console.log("CREATING INITIAL Authors...");

  try {
    // This method will guarantee proper order when seeding
    // Use for seeding purpose to ensure order of data without creating seed specific functions
    for (const author of authors) {
      const newAuthor = await createAuthor(author);
    }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    // const createdAuthors = await Promise.all(
    //   authors.map((author) => createAuthor(author))
    // );

    console.log("FINISHED CREATING INITIAL AUTHORS!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL AUTHORS: ` + error);
    throw error;
  }
}
//* --------------CREATE INITIAL AUTHORS-------------

module.exports = {
  createInitialAuthors,
};
