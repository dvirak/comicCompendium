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
