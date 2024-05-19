const client = require("../../client");

async function buildIllustratorsTable() {
  console.log("STARTING TO BUILD Illustrators TABLE...");

  try {
    await client.query(`
      CREATE TABLE illustrators (
        id SERIAL PRIMARY KEY,
        illustrator_name VARCHAR(255) UNIQUE
      );
    `);

    console.log("FINISHED BUILDING Illustrators TABLE!");
  } catch (error) {
    console.error("Error creating Illustrators tables: " + error.message);
    throw error;
  }
}

module.exports = {
  buildIllustratorsTable,
};

//     await client.query(`
//   CREATE TABLE illustrators (
//     id SERIAL PRIMARY KEY,
//     illustrator_name VARCHAR(255) UNIQUE
//   );
// `);
