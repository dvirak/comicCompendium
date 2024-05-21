//! Imported Files --------------------------
const { globalRatings } = require("../Data/globalRatingsData");
const {
  createGlobalRating,
} = require("../../../DBFunctions/GlobalRatingDB/createGobalRatingDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL GLOBAL RATINGS-------------
async function createInitialGlobalRatings() {
  console.log("CREATING INITIAL Global Ratings...");

  try {
    // This method will guarantee proper order when seeding
    // for (const globalRating of globalRatings) {
    //   console.log(globalRating); // You can customize this according to your data structure
    //   const newGlobalRating = await createGlobalRating(globalRating);
    // }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    const createdGlobalRatings = await Promise.all(
      globalRatings.map((globalRating) => createGlobalRating(globalRating))
    );

    console.log("FINISHED CREATING INITIAL GLOBAL RATINGS!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL GLOBAL RATINGS: ` + error);
    throw error;
  }
}
//* --------------CREATE INITIAL GLOBAL RATINGS-------------

module.exports = {
  createInitialGlobalRatings,
};
