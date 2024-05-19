//! Imported Files --------------------------
const { letterers } = require("../Data/lettererData");
const { createLetterer } = require("../../../DBFunctions/lettererDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL LETTERERS-------------
async function createInitialLetterers() {
  console.log("CREATING INITIAL Letterers...");

  try {
    // This method will guarantee proper order when seeding
    // for (const letterer of letterers) {
    //   console.log(letterer); // You can customize this according to your data structure
    //   const newLetterer = await createLetterer(letterer);
    // }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    const createdLetterers = await Promise.all(
      letterers.map((letterer) => createLetterer(letterer))
    );

    console.log("FINISHED CREATING INITIAL LETTERERS!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL LETTERERS: ` + error);
    throw error;
  }
}
//* --------------CREATE INITIAL LETTERERS-------------

module.exports = {
  createInitialLetterers,
};
