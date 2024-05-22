//! Imported Files --------------------------
const { userRatings } = require("../Data/userRatingsData");
const { createUserRating } = require("../../../DBFunctions/UserRatingsDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL USER RATINGS-------------
async function createInitialUserRatings() {
  console.log("CREATING INITIAL User Ratings...");

  try {
    // This method will guarantee proper order when seeding
    // for (const userRating of userRatings) {
    //   console.log(userRating); // You can customize this according to your data structure
    //   const newUserRating = await createUserRating(userRating);
    // }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    const createdUserRatings = await Promise.all(
      userRatings.map((userRating) => createUserRating(userRating))
    );

    console.log("FINISHED CREATING INITIAL USER RATINGS!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL USER RATINGS: ` + error);
    throw error;
  }
}
//* --------------CREATE INITIAL USER RATINGS-------------

module.exports = {
  createInitialUserRatings,
};
