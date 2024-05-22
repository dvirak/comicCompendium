//! Imported Files --------------------------
const { bookColorists } = require("../Data/bookColoristData");
const {
  createBookColorist,
} = require("../../../DBFunctions/BookColoristDB/createBookColoristDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL BOOK COLORISTS-------------
async function createInitialBookColorists() {
  console.log("CREATING INITIAL BookColorists...");

  try {
    // This method will guarantee proper order when seeding
    for (const bookColorist of bookColorists) {
      const newBookColorist = await createBookColorist(bookColorist);
    }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    // const createdBookColorist = await Promise.all(
    //   bookColorists.map((bookColorist) => createBookColorist(bookColorist))
    // );

    console.log("FINISHED CREATING INITIAL BookColorists!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL BookColorists: ` + error);
    throw error;
  }
}
//* --------------CREATE INITIAL BOOK COLORISTS-------------

module.exports = {
  createInitialBookColorists,
};
