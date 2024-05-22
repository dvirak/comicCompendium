const client = require("../../client");

async function dropTables() {
  // Remove all tables if the exist
  console.log("DROPPING TABLES...");

  //Drop all tables in correct order
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
    `);

    console.log("TABLES DROPPED!");
  } catch (error) {
    throw error;
  }
}

module.exports = {
  dropTables,
};
