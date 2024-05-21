//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------CREATE LETTERER DB-------------
async function createLetterer({ letterer_name }) {
  console.log("CREATING LETTERER: " + letterer_name);

  try {
    const {
      rows: [letterer],
    } = await client.query(
      `
      INSERT INTO letterers(letterer_name)
      VALUES ($1)
      ON CONFLICT (letterer_name) DO NOTHING
      RETURNING *
      `,
      [letterer_name]
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
