//! Imported Files --------------------------
const { pencillers } = require("../Data/pencillerData");
const {
  createPencillerDB,
} = require("../../../DBFunctions/PencillerDB/createPencillerDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL PENCILLERS-------------
async function createInitialPencillers() {
  console.log("CREATING INITIAL Pencillers...");

  try {
    // This method will guarantee proper order when seeding
    for (const penciller of pencillers) {
      const newPenciller = await createPencillerDB(penciller);
    }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    // const createdPencillers = await Promise.all(
    //   pencillers.map((penciller) => createPenciller(penciller))
    // );

    console.log("FINISHED CREATING INITIAL PENCILLERS!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL PENCILLERS: ` + error);
    throw error;
  }
}
//* --------------CREATE INITIAL PENCILLERS-------------

module.exports = {
  createInitialPencillers,
};
