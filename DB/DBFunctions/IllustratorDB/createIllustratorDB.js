//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------CREATE ILLUSTRATOR DB-------------
async function createIllustrator({ illustrator_name }) {
  console.log("CREATING ILLUSTRATOR: " + illustrator_name);

  try {
    const {
      rows: [illustrator],
    } = await client.query(
      `
      INSERT INTO illustrators(illustrator_name)
      VALUES ($1)
      ON CONFLICT (illustrator_name) DO NOTHING
      RETURNING *
      `,
      [illustrator_name]
    );

    console.log("CREATED ILLUSTRATOR: " + illustrator_name);

    return illustrator;
  } catch (error) {
    console.error(`Error creating ${illustrator_name}: ${error}`);
    throw error;
  }
}
//* --------------CREATE ILLUSTRATOR DB-------------

module.exports = {
  createIllustrator,
};
