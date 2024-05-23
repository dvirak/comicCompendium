//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------CREATE INKER DB-------------
async function createInkerDB({ inker_name }) {
  console.log("CREATING INKER IN DB: " + inker_name);

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

    console.log("CREATED INKER IN DB: " + inker_name);

    return inker;
  } catch (error) {
    console.error(
      `Error creating inker in DB with name ${inker_name}: ${error}`
    );
    throw error;
  }
}
//* --------------CREATE INKER DB-------------

module.exports = {
  createInkerDB,
};
