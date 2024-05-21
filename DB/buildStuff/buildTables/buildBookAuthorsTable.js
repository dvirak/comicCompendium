const client = require("../../client");

async function buildBookAuthorsTable() {
  console.log("STARTING TO BUILD bookAuthors TABLE...");

  try {
    await client.query(`
      CREATE TABLE book_authors (
        id SERIAL PRIMARY KEY,
        book_id INTEGER REFERENCES books(id),
        author_id INTEGER REFERENCES authors(id),
        CONSTRAINT unique_book_author UNIQUE (book_id, author_id)
      );
    `);

    console.log("FINISHED BUILDING bookAuthors TABLE!");
  } catch (error) {
    console.error("Error creating bookAuthors tables: " + error.message);
    throw error;
  }
}

module.exports = {
  buildBookAuthorsTable,
};

//     await client.query(`
//   CREATE TABLE book_authors (
//     id SERIAL PRIMARY KEY,
//     colorist_name VARCHAR(255) UNIQUE
//   );
// `);
