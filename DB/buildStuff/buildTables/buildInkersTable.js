const client = require("../../client");

async function buildInkersTable() {
  console.log("STARTING TO BUILD Inkers TABLE...");

  try {
    await client.query(`
      CREATE TABLE inkers (
        id SERIAL PRIMARY KEY,
        inker_name VARCHAR(255) UNIQUE
      );
    `);

    console.log("FINISHED BUILDING Inkers TABLE!");
  } catch (error) {
    console.error("Error creating Inkers tables: " + error.message);
    throw error;
  }
}

module.exports = {
  buildInkersTable,
};

//     await client.query(`
//   CREATE TABLE inkers (
//     id SERIAL PRIMARY KEY,
//     inker_name VARCHAR(255) UNIQUE
//   );
// `);
