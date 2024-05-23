//! Imported Files --------------------------
const { bookSeries } = require("../Data/bookSeriesData");
const {
  createBookSeriesDB,
} = require("../../../DBFunctions/BookSeriesDB/createBookSeriesDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL BOOK SERIES-------------
async function createInitialBookSeries() {
  console.log("CREATING INITIAL BookSeries...");

  try {
    // This method will guarantee proper order when seeding
    for (const bookSeriesItem of bookSeries) {
      const newBookSeries = await createBookSeriesDB(bookSeriesItem);
    }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    // const createdBookSeries = await Promise.all(
    //   bookSeries.map((bookSeriesItem) => createBookSeries(bookSeriesItem))
    // );

    console.log("FINISHED CREATING INITIAL BookSeries!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL BookSeries: ` + error);
    throw error;
  }
}
//* --------------CREATE INITIAL BOOK SERIES-------------

module.exports = {
  createInitialBookSeries,
};
