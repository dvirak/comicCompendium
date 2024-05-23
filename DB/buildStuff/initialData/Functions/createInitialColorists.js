//! Imported Files --------------------------
const { colorists } = require("../Data/coloristData");
const {
  createColoristDB,
} = require("../../../DBFunctions/ColoristDB/createColoristDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL COLORISTS-------------
async function createInitialColorists() {
  console.log("CREATING INITIAL Colorists...");

  try {
    // This method will guarantee proper order when seeding
    for (const colorist of colorists) {
      const newColorist = await createColoristDB(colorist);
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
