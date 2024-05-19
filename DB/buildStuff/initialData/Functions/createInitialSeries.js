const { series } = require("../Data/seriesData");
const { createSeries } = require("../../../DBFunctions/seriesDB");

async function createInitialSeries() {
  console.log("CREATING INITIAL Series...");

  try {
    const createdSeries = await Promise.all(
      series.map((seriesItem) => createSeries(seriesItem))
    );

    console.log("FINISHED CREATING INITIAL SERIES!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL SERIES: ` + error);
    throw error;
  }
}

module.exports = {
  createInitialSeries,
};
