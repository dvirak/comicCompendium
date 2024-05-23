//! Imported Files --------------------------
const { bookLetterers } = require("../Data/bookLettererData");
const {
  createBookLettererDB,
} = require("../../../DBFunctions/BookLettererDB/createBookLettererDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL BOOK LETTERERS-------------
async function createInitialBookLetterers() {
  console.log("CREATING INITIAL BookLetterers...");

  try {
    // This method will guarantee proper order when seeding
    for (const bookLetterer of bookLetterers) {
      const newBookLetterer = await createBookLettererDB(bookLetterer);
    }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    // const createdBookLetterers = await Promise.all(
    //   bookLetterers.map((bookLetterer) => createBookLetterer(bookLetterer))
    // );

    console.log("FINISHED CREATING INITIAL BookLetterers!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL BookLetterers: ` + error);
    throw error;
  }
}
//* --------------CREATE INITIAL BOOK LETTERERS-------------

module.exports = {
  createInitialBookLetterers,
};
