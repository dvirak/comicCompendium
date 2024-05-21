//! Imported Files --------------------------
const { series } = require("../Data/seriesData");
const {
  createSeries,
} = require("../../../DBFunctions/SeriesDB/createSeriesDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL SERIES-------------
async function createInitialSeries() {
  console.log("CREATING INITIAL Series...");

  try {
    // This method will guarantee proper order when seeding
    for (const serie of series) {
      const newSeries = await createSeries(serie);
    }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    // const createdSeries = await Promise.all(
    //   series.map((serie) => createSeries(serie))
    // );

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
