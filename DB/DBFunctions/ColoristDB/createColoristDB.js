//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------CREATE COLORIST DB-------------
async function createColoristDB({ colorist_name }) {
  console.log("CREATING COLORIST IN DB: " + colorist_name);

  try {
    const {
      rows: [colorist],
    } = await client.query(
      `
      INSERT INTO colorists(colorist_name)
      VALUES ($1)
      ON CONFLICT (colorist_name) DO NOTHING
      RETURNING *
      `,
      [colorist_name]
    );

    console.log("CREATED COLORIST IN DB: " + colorist_name);

    return colorist;
  } catch (error) {
    console.error(
      `Error creating colorist in DB with name ${colorist_name}: ${error}`
    );
    throw error;
  }
}
//* --------------CREATE COLORIST DB-------------

module.exports = {
  createColoristDB,
};
