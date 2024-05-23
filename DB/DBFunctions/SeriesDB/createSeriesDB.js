//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------CREATE SERIES DB-------------
async function createSeriesDB({ series_name }) {
  console.log("CREATING SERIES IN DB: " + series_name);

  try {
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

    console.log("CREATED SERIES IN DB: " + series_name);

    return series;
  } catch (error) {
    console.error(
      `Error creating series in DB with name ${series_name}: ${error}`
    );
    throw error;
  }
}
//* --------------CREATE SERIES DB-------------

module.exports = {
  createSeriesDB,
};
