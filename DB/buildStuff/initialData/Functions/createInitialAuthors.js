//! Imported Files --------------------------
const { authors } = require("../Data/authorData");
const { createAuthor } = require("../../../DBFunctions/authorDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL AUTHORS-------------
async function createInitialAuthors() {
  console.log("CREATING INITIAL Authors...");

  try {
    // This method will guarantee proper order when seeding
    // for (const author of authors) {
    //   console.log(author.author_name);
    //   const newAuthor = await createAuthor(author);
    // }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    const createdAuthors = await Promise.all(
      authors.map((author) => createAuthor(author))
    );

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
