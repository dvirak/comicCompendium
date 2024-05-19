//! Imported Files --------------------------
const client = require("../client");
//! ---------------------------------------------

//* --------------CREATE PENCILLER DB-------------
async function createPenciller({ id, penciller_name }) {
  console.log("CREATING PENCILLER: " + penciller_name);

  try {
    const {
      rows: [penciller],
    } = await client.query(
      `
      INSERT INTO pencillers(id, penciller_name)
      VALUES ($1, $2)
      ON CONFLICT (id) DO NOTHING
      RETURNING *
      `,
      [id, penciller_name]
    );

    console.log("CREATED PENCILLER: " + penciller_name);

    return penciller;
  } catch (error) {
    console.error(`Error creating ${penciller_name}: ${error}`);
    throw error;
  }
}
//* --------------CREATE PENCILLER DB-------------

module.exports = {
  createPenciller,
};
