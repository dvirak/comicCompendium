//! Imported Files --------------------------
const client = require("../client");
//! ---------------------------------------------

//* --------------CREATE SERIES DB-------------
async function createSeries({ id, series_name }) {
  console.log("CREATING SERIES: " + series_name);

  try {
    const {
      rows: [series],
    } = await client.query(
      `
      INSERT INTO series(id, series_name)
      VALUES ($1, $2)
      ON CONFLICT (id) DO NOTHING
      RETURNING *
      `,
      [id, series_name]
    );

    console.log("CREATED SERIES: " + series_name);

    return series;
  } catch (error) {
    console.error(`Error creating ${series_name}: ${error}`);
    throw error;
  }
}
//* --------------CREATE SERIES DB-------------

module.exports = {
  createSeries,
};
