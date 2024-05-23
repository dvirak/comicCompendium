//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------CREATE ILLUSTRATOR DB-------------
async function createIllustratorDB({ illustrator_name }) {
  console.log("CREATING ILLUSTRATOR IN DB: " + illustrator_name);

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

    console.log("CREATED ILLUSTRATOR IN DB: " + illustrator_name);

    return illustrator;
  } catch (error) {
    console.error(
      `Error creating illustrator in DB with name ${illustrator_name}: ${error}`
    );
    throw error;
  }
}
//* --------------CREATE ILLUSTRATOR DB-------------

module.exports = {
  createIllustratorDB,
};
