//! Imported Files --------------------------
const { series } = require("../Data/seriesData");
const { createSeries } = require("../../../DBFunctions/seriesDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL SERIES-------------
async function createInitialSeries() {
  console.log("CREATING INITIAL Series...");

  try {
    // This method will guarantee proper order when seeding
    // for (const serie of series) {
    //   console.log(serie); // You can customize this according to your data structure
    //   const newSeries = await createSeries(serie);
    // }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    const createdSeries = await Promise.all(
      series.map((serie) => createSeries(serie))
    );

    console.log("FINISHED CREATING INITIAL SERIES!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL SERIES: ` + error);
    throw error;
  }
}
//* --------------CREATE INITIAL SERIES-------------

module.exports = {
  createInitialSeries,
};
