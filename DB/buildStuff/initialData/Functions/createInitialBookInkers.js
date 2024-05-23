//! Imported Files --------------------------
const { bookInkers } = require("../Data/bookInkerData");
const {
  createBookInkerDB,
} = require("../../../DBFunctions/BookInkerDB/createBookInkerDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL BOOK INKERS-------------
async function createInitialBookInkers() {
  console.log("CREATING INITIAL BookInkers...");

  try {
    // This method will guarantee proper order when seeding
    for (const bookInker of bookInkers) {
      const newBookInker = await createBookInkerDB(bookInker);
    }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    // const createdBookInker = await Promise.all(
    //   bookInkers.map((bookInker) => createBookInker(bookInker))
    // );

    console.log("FINISHED CREATING INITIAL BookInkers!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL BookInkers: ` + error);
    throw error;
  }
}
//* --------------CREATE INITIAL BOOK INKERS-------------

module.exports = {
  createInitialBookInkers,
};
