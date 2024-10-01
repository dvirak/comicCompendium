//! Imported Files --------------------------
const client = require("../../client");
//! ---------------------------------------------

//* --------------BUILD BOOK AUTHORS TABLE-------------
async function buildBookAuthorsTable() {
  console.log("STARTING TO BUILD bookAuthors TABLE...");

  try {
    await client.query(`
      CREATE TABLE book_authors (
        id SERIAL PRIMARY KEY,
        book_id INTEGER 
          REFERENCES books(id) 
          ON DELETE CASCADE,
        author_id INTEGER 
          REFERENCES authors(id) 
          ON DELETE CASCADE,
        CONSTRAINT unique_book_author UNIQUE (book_id, author_id)
        );
    `);

    console.log("FINISHED BUILDING bookAuthors TABLE!");
  } catch (error) {
    console.error("Error creating bookAuthors tables: " + error.message);
    throw error;
  }
}
//* --------------BUILD BOOK AUTHORS TABLE-------------

module.exports = {
  buildBookAuthorsTable,
};
