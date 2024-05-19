//! Imported Files --------------------------
const client = require("../client");
//! ---------------------------------------------

//* --------------CREATE LETTERER DB-------------
async function createLetterer({ id, letterer_name }) {
  console.log("CREATING LETTERER: " + letterer_name);

  try {
    const {
      rows: [letterer],
    } = await client.query(
      `
      INSERT INTO letterers(id, letterer_name)
      VALUES ($1, $2)
      ON CONFLICT (id) DO NOTHING
      RETURNING *
      `,
      [id, letterer_name]
    );

    console.log("CREATED LETTERER: " + letterer_name);

    return letterer;
  } catch (error) {
    console.error(`Error creating ${letterer_name}: ${error}`);
    throw error;
  }
}
//* --------------CREATE LETTERER DB-------------

module.exports = {
  createLetterer,
};
