const client = require("./client");
const { seedAllTables } = require("./seedTables/seedAllTables");
const { createUser } = require("./usersDB");
const { createBook } = require("./booksDB");
const { books } = require("../Data/bookData");

// Remove all tables if the exist
async function dropTables() {
  console.log("DROPPING TABLES...");

  //Drop all tables in correct order
  try {
    await client.query(`
  DROP TABLE IF EXISTS users_books;
  DROP TABLE IF EXISTS wishlist_items;
  DROP TABLE IF EXISTS wishlists;
  DROP TABLE IF EXISTS user_ratings;
  DROP TABLE IF EXISTS global_ratings;
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

// Build all tables
async function createTables() {
  try {
    console.log("CREATING TABLES...");

    await seedAllTables();

    console.log("FINISHED BUILDING TABLES!");
  } catch (error) {
    console.error("Error creating tables: " + error.message);
    throw error;
  }
}

// Create initial users
async function createInitialUsers() {
  console.log("CREATING INITIAL USERS...");

  try {
    const usersToCreate = [
      {
        username: "dv43",
        password: "daniel43",
        first_name: "Daniel",
        last_name: "Virak",
        preferred_name: "Daniel",
        phone: 8048782866,
        email: "dvirak43@vt.edu",
        admin: true,
      },
    ];

    for (const user of usersToCreate) {
      const newUser = await createUser(user);
    }
  } catch (error) {
    throw error;
  }
}

async function createInitialBooks() {
  console.log("CREATING INITIAL BOOKS...");

  try {
    // This method will guarantee proper order when seeding
    // for (const book of books) {
    //   console.log(book.title);
    //   const newBook = await createBook(book);
    // }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    const createdBooks = await Promise.all(
      books.map((book) => createBook(book))
    );
  } catch (error) {
    throw error;
  }
}

// Drop tables, create tables, create Initial Data
async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialBooks();
  } catch (error) {
    throw error;
  }
}

// Export Function
module.exports = {
  rebuildDB,
};
