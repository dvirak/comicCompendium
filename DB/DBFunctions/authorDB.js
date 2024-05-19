//! Imported Files --------------------------
const client = require("../client");
//! ---------------------------------------------

//* --------------CREATE AUTHOR DB-------------
async function createAuthor({ id, author_name }) {
  console.log("CREATING AUTHOR: " + author_name);

  try {
    const {
      rows: [author],
    } = await client.query(
      `
      INSERT INTO authors(id, author_name)
      VALUES ($1, $2)
      ON CONFLICT (id) DO NOTHING
      RETURNING *
      `,
      [id, author_name]
    );

    console.log("CREATED AUTHOR: " + author_name);

    return author;
  } catch (error) {
    console.error(`Error creating ${author_name}: ${error}`);
    throw error;
  }
}
//* --------------CREATE AUTHOR DB-------------

module.exports = {
  createAuthor,
};
