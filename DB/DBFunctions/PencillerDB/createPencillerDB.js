//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------CREATE PENCILLER DB-------------
async function createPencillerDB({ penciller_name }) {
  console.log("CREATING PENCILLER IN DB: " + penciller_name);

  try {
    const {
      rows: [penciller],
    } = await client.query(
      `
      INSERT INTO pencillers(penciller_name)
      VALUES ($1)
      ON CONFLICT (penciller_name) DO NOTHING
      RETURNING *
      `,
      [penciller_name]
    );

    console.log("CREATED PENCILLER IN DB: " + penciller_name);

    return penciller;
  } catch (error) {
    console.error(
      `Error creating penciller in DB with name ${penciller_name}: ${error}`
    );
    throw error;
  }
}
//* --------------CREATE PENCILLER DB-------------

module.exports = {
  createPencillerDB,
};
