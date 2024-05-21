//! Imported Files --------------------------
const { colorists } = require("../Data/bookAuthorsData");
const {
  createColorist,
} = require("../../../DBFunctions/BookAuthorDB/createBookAuthorDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL COLORISTS-------------
async function createInitialColorists() {
  console.log("CREATING INITIAL Colorists...");

  try {
    // This method will guarantee proper order when seeding
    for (const colorist of colorists) {
      const newColorist = await createColorist(colorist);
    }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    // const createdColorists = await Promise.all(
    //   colorists.map((colorist) => createColorist(colorist))
    // );

    console.log("FINISHED CREATING INITIAL COLORISTS!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL COLORISTS: ` + error);
    throw error;
  }
}
//* --------------CREATE INITIAL COLORISTS-------------

module.exports = {
  createInitialColorists,
};
