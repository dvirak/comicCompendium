const client = require("../../client");

async function buildSeriesTable() {
  console.log("STARTING TO BUILD Series BOOKS TABLE...");

  try {
    await client.query(`
      CREATE TABLE series (
        id SERIAL PRIMARY KEY,
        series_name VARCHAR(255) UNIQUE
      );
    `);

    console.log("FINISHED BUILDING Series TABLE!");
  } catch (error) {
    console.error("Error creating Series tables: " + error.message);
    throw error;
  }
}

module.exports = {
  buildSeriesTable,
};

//     await client.query(`
//   CREATE TABLE series (
//     id SERIAL PRIMARY KEY,
//     series_name VARCHAR(255) UNIQUE
//   );
// `);
