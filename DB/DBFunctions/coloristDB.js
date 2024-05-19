//! Imported Files --------------------------
const client = require("../client");
//! ---------------------------------------------

//* --------------CREATE COLORIST DB-------------
async function createColorist({ id, colorist_name }) {
  console.log("CREATING COLORIST: " + colorist_name);

  try {
    const {
      rows: [colorist],
    } = await client.query(
      `
      INSERT INTO colorists(id, colorist_name)
      VALUES ($1, $2)
      ON CONFLICT (id) DO NOTHING
      RETURNING *
      `,
      [id, colorist_name]
    );

    console.log("CREATED COLORIST: " + colorist_name);

    return colorist;
  } catch (error) {
    console.error(`Error creating ${colorist_name}: ${error}`);
    throw error;
  }
}
//* --------------CREATE COLORIST DB-------------

module.exports = {
  createColorist,
};
