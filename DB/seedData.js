const client = require("./client");
const { createUser } = require("./usersDB");
const { createBook } = require("./booksDB");
const { books } = require("../Data/bookData");

// Remove all tables if the exist
async function dropTables() {
  console.log("DROPPING TABLES...");

  //Drop all tables in correct order
  try {
    await client.query(`
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS books;
    `);

    console.log("TABLES DROPPED!");
  } catch (error) {
    throw error;
  }
}

// Build all tables
async function createTables() {
  try {
    console.log("BUILDING TABLES...");

    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      preferred_name VARCHAR(255) NULL,
      phone BIGINT NOT NULL,
      email VARCHAR(255) NOT NULL,
      admin BOOLEAN NOT NULL DEFAULT false
    );
      `);

    await client.query(`
    CREATE TABLE books(
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) UNIQUE NOT NULL,
      author VARCHAR(255) NOT NULL,
      illustrator VARCHAR(255) NULL,
      penciler VARCHAR(255) NULL,
      inker VARCHAR(255) NULL,
      colorist VARCHAR(255) NULL,
      letterer VARCHAR(255) NULL,
      publisher VARCHAR(255) NULL,
      publish_date DATE NULL,
      description VARCHAR NULL,
      print_length INTEGER NULL,
      genre1 VARCHAR(255) NULL,
      genre2 VARCHAR(255) NULL,
      genre3 VARCHAR(255) NULL,
      series_name VARCHAR(255) NULL,
      series_volume VARCHAR(255) NULL,
      cover_image VARCHAR(255) NULL
    );
    `);

    console.log("FINISHED BUILDING TABLES!");
  } catch (error) {
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
