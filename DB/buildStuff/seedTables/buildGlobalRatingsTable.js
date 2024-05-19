const client = require("../../client");

async function buildGlobalRatingsTable() {
  console.log("STARTING TO BUILD GlobalRatings TABLE...");

  try {
    await client.query(`
      CREATE TABLE global_ratings (
        id SERIAL PRIMARY KEY,
        comic_book_id INTEGER REFERENCES books(id),
        user_id INTEGER REFERENCES users(id),
        amazon_rating FLOAT,
        goodreads_rating FLOAT,
        slab_rating FLOAT
      );
    `);

    console.log("FINISHED BUILDING GlobalRatings TABLE!");
  } catch (error) {
    console.error("Error creating GlobalRatings tables: " + error.message);
    throw error;
  }
}

module.exports = {
  buildGlobalRatingsTable,
};

//     await client.query(`
//   CREATE TABLE global_ratings (
//     id SERIAL PRIMARY KEY,
//     comic_book_id INTEGER REFERENCES comic_books(id),
//     user_id INTEGER REFERENCES users(id),
//     amazon_rating FLOAT,
//     goodreads_rating FLOAT,
//     slab_rating FLOAT
//   );
// `);
