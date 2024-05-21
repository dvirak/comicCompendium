//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------CREATE INKER DB-------------
async function createInker({ inker_name }) {
  console.log("CREATING INKER: " + inker_name);

  try {
    const {
      rows: [inker],
    } = await client.query(
      `
      INSERT INTO inkers(inker_name)
      VALUES ($1)
      ON CONFLICT (inker_name) DO NOTHING
      RETURNING *
      `,
      [inker_name]
    );

    console.log("CREATED INKER: " + inker_name);

    return inker;
  } catch (error) {
    console.error(`Error creating ${inker_name}: ${error}`);
    throw error;
  }
}
//* --------------CREATE INKER DB-------------

module.exports = {
  createInker,
};
