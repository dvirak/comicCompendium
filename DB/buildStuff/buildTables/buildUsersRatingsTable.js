const client = require("../../client");

async function buildUsersRatingsTable() {
  console.log("STARTING TO BUILD UsersRatings TABLE...");

  try {
    await client.query(`
      CREATE TABLE user_ratings (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        book_id INTEGER REFERENCES books(id),
        user_rating FLOAT,
        CONSTRAINT unique_user_book_rating UNIQUE (user_id, book_id)
      );
    `);

    console.log("FINISHED BUILDING UsersRatings TABLE!");
  } catch (error) {
    console.error("Error creating UsersRatings tables: " + error.message);
    throw error;
  }
}

module.exports = {
  buildUsersRatingsTable,
};

//     await client.query(`
//   CREATE TABLE user_ratings (
//     id SERIAL PRIMARY KEY,
//     user_id INTEGER REFERENCES users(id),
//     comic_book_id INTEGER REFERENCES comic_books(id),
//     user_rating FLOAT,
//     CONSTRAINT unique_user_book_rating UNIQUE (user_id, comic_book_id)
//   );
// `);
