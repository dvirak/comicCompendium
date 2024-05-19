//! Imported Files --------------------------
const client = require("../client");
//! ---------------------------------------------

//* --------------CREATE ILLUSTRATOR DB-------------
async function createIllustrator({ id, illustrator_name }) {
  console.log("CREATING ILLUSTRATOR: " + illustrator_name);

  try {
    const {
      rows: [illustrator],
    } = await client.query(
      `
      INSERT INTO illustrators(id, illustrator_name)
      VALUES ($1, $2)
      ON CONFLICT (id) DO NOTHING
      RETURNING *
      `,
      [id, illustrator_name]
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
