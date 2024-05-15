const client = require("./client");

// Remove all tables
async function dropTables() {
  try {
    console.log("DROPPING TABLES...");
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
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) UNIQUE NOT NULL,
      author VARCHAR(255) NOT NULL,
      artist VARCHAR(255) NOT NULL,
      publisher VARCHAR(255) NOT NULL,
      publish_date DATE NOT NULL,
      description VARCHAR NOT NULL,
      genre VARCHAR(255) NOT NULL,
      series_name VARCHAR(255) NULL,
      series_volume SMALLINT NULL,
      cover_image VARCHAR(255) NOT NULL,
    );
    `);
  } catch (error) {
    throw error;
  }
}

// Create initial users
async function createInitialUsers() {
  try {
    console.log("CREATING INITIAL USERS...");
  } catch (error) {
    throw error;
  }
}

async function createInitialBooks() {
  try {
    console.log("CREATING INITIAL BOOKS...");
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
