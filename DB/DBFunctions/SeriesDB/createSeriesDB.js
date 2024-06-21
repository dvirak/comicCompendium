// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../client");
// ! -----------------------------------------------------------

//* -----------------CREATE SERIES DB---------------
/**
 * Creates a new series in the database with the provided series_name.
 *
 * @param {Object} seriesData - Object containing series data.
 * @param {string} seriesData.series_name - The name of the series.
 * @returns {Promise<Object>} A promise that resolves to the created series data.
 * @throws {Error} If an error occurs during the series creation process.
 *
 * @precondition seriesData is an object containing the series_name.
 * @postcondition The function returns a Promise that resolves to an object containing the created series data from the database.
 *                If an error occurs, the function throws an error.
 */
async function createSeriesDB({ series_name }) {
  try {
    // Insert the series into the database, or do nothing if it already exists
    const {
      rows: [series],
    } = await client.query(
      `
      INSERT INTO series(series_name)
      VALUES ($1)
      ON CONFLICT (series_name) DO NOTHING
      RETURNING *
      `,
      [series_name]
    );

    // Return the created series data
    return series;
  } catch (error) {
    // Log the error for further handling
    logErrorDB("createSeriesDB", error);
    throw error;
  }
}
//* -----------------CREATE SERIES DB---------------

// Export the function for use by other modules.
module.exports = {
  createSeriesDB,
};
