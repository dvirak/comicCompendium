//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------CREATE PUBLISHER DB-------------
async function createPublisher({ publisher_name }) {
  console.log("CREATING PUBLISHER: " + publisher_name);

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

    console.log("CREATED PUBLISHER: " + publisher_name);

    return publisher;
  } catch (error) {
    console.error(`Error creating ${publisher_name}: ${error}`);
    throw error;
  }
}
//* --------------CREATE PUBLISHER DB-------------

module.exports = {
  createPublisher,
};
