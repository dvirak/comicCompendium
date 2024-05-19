const client = require("../../client");

async function buildUsersBooksTable() {
  console.log("STARTING TO BUILD UsersBooks TABLE...");

  try {
    await client.query(`
      CREATE TABLE users_books (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        book_id INTEGER REFERENCES books(id),
        UNIQUE (user_id, book_id)
      );
    `);

    console.log("FINISHED BUILDING UsersBooks TABLE!");
  } catch (error) {
    console.error("Error creating UsersBooks tables: " + error.message);
    throw error;
  }
}

module.exports = {
  buildUsersBooksTable,
};

//     await client.query(`
//   CREATE TABLE users_books (
//     id SERIAL PRIMARY KEY,
//     user_id INTEGER REFERENCES users(id),
//     book_id INTEGER REFERENCES books(id),
//     UNIQUE (user_id, book_id)
//   );
// `);
