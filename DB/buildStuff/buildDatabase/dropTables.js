// ! ----------------- IMPORTED FILES --------------------------
const client = require("../../client");
const { logErrorDB } = require("../../../Errors/DB");
// ! -----------------------------------------------------------

//* --------------DROP TABLES DB-------------
/**
 * Drop all tables in the database if they exist.
 *
 * @returns {Promise<void>} A promise that resolves when tables are dropped successfully.
 * @throws {Error} If an error occurs while dropping tables.
 *
 * @precondition None.
 * @postcondition All tables specified are dropped from the database if they exist.
 */
async function dropTables() {
  console.log("DROPPING TABLES...");

  try {
    await client.query(`
      DROP TABLE IF EXISTS users_books;
      DROP TABLE IF EXISTS wishlist_items;
      DROP TABLE IF EXISTS wishlists;
      DROP TABLE IF EXISTS user_ratings;
      DROP TABLE IF EXISTS global_ratings;
      DROP TABLE IF EXISTS book_authors;
      DROP TABLE IF EXISTS book_colorists;
      DROP TABLE IF EXISTS book_illustrators;
      DROP TABLE IF EXISTS book_pencillers;
      DROP TABLE IF EXISTS book_inkers;
      DROP TABLE IF EXISTS book_series;
      DROP TABLE IF EXISTS book_letterers;
      DROP TABLE IF EXISTS book_genres;
      DROP TABLE IF EXISTS book_publishers;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS books;
      DROP TABLE IF EXISTS authors;
      DROP TABLE IF EXISTS illustrators;
      DROP TABLE IF EXISTS pencillers;
      DROP TABLE IF EXISTS inkers;
      DROP TABLE IF EXISTS colorists;
      DROP TABLE IF EXISTS letterers;
      DROP TABLE IF EXISTS publishers;
      DROP TABLE IF EXISTS series;
      DROP TABLE IF EXISTS genres;
    `);

    console.log("TABLES DROPPED!");
  } catch (error) {
    // Log the error for further handling
    logErrorDB("dropTables", error);
    throw error;
  }
}
//* --------------DROP TABLES DB-------------

// Export the function for use by other modules.
module.exports = {
  dropTables,
};
