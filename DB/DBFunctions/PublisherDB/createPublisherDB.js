//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------CREATE PUBLISHER DB-------------
async function createPublisherDB({ publisher_name }) {
  console.log("CREATING PUBLISHER IN DB: " + publisher_name);

  try {
    const {
      rows: [publisher],
    } = await client.query(
      `
      INSERT INTO publishers(publisher_name)
      VALUES ($1)
      ON CONFLICT (publisher_name) DO NOTHING
      RETURNING *
      `,
      [publisher_name]
    );

    console.log("CREATED PUBLISHER IN DB: " + publisher_name);

    return publisher;
  } catch (error) {
    console.error(
      `Error creating publisher in DB with name ${publisher_name}: ${error}`
    );
    throw error;
  }
}
//* --------------CREATE PUBLISHER DB-------------

module.exports = {
  createPublisherDB,
};
