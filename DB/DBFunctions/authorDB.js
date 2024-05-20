//! Imported Files --------------------------
const client = require("../client");
//! ---------------------------------------------

//* --------------CREATE AUTHOR DB-------------
async function createAuthor({ author_name }) {
  console.log("CREATING AUTHOR: " + author_name);

  try {
    const {
      rows: [author],
    } = await client.query(
      `
      INSERT INTO authors(author_name)
      VALUES ($1)
      ON CONFLICT (author_name) DO NOTHING
      RETURNING *
      `,
      [author_name]
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
