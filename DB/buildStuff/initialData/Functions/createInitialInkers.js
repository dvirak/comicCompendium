//! Imported Files --------------------------
const { inkers } = require("../Data/inkerData");
const { createInker } = require("../../../DBFunctions/InkerDB/createInkerDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL INKERS-------------
async function createInitialInkers() {
  console.log("CREATING INITIAL Inkers...");

  try {
    // This method will guarantee proper order when seeding
    for (const inker of inkers) {
      const newInker = await createInker(inker);
    }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    // const createdInkers = await Promise.all(
    //   inkers.map((inker) => createInker(inker))
    // );

    console.log("FINISHED CREATING INITIAL INKERS!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL INKERS: ` + error);
    throw error;
  }
}
//* --------------CREATE INITIAL INKERS-------------

module.exports = {
  createInitialInkers,
};
