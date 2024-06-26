const client = require("../../client");

async function buildColoristsTable() {
  console.log("STARTING TO BUILD Colorists TABLE...");

  try {
    await client.query(`
      CREATE TABLE colorists (
        id SERIAL PRIMARY KEY,
        colorist_name VARCHAR(255) UNIQUE
      );
    `);

    console.log("FINISHED BUILDING Colorists TABLE!");
  } catch (error) {
    console.error("Error creating Colorists tables: " + error.message);
    throw error;
  }
}

module.exports = {
  buildColoristsTable,
};

//     await client.query(`
//   CREATE TABLE colorists (
//     id SERIAL PRIMARY KEY,
//     colorist_name VARCHAR(255) UNIQUE
//   );
// `);
