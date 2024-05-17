const buildAuthorsTable = require("./buildAuthorsTable");
const buildBooksTable = require("./buildBooksTable");
const buildColoristsTable = require("./buildColoristsTable");
const buildGlobalRatingsTable = require("./buildGlobalRatingsTable");
const buildIllustratorsTable = require("./buildIllustratorsTable");
const buildInkersTable = require("./buildInkersTable");
const buildLetterersTable = require("./buildLetterersTable");
const buildPencillersTable = require("./buildPencillersTable");
const buildPublishersTable = require("./buildPublishersTable");
const buildSeriesTable = require("./buildSeriesTable");
const buildUsersBooksTable = require("./buildUsersBooksTable");
const buildUsersRatingsTable = require("./buildUsersRatingsTable");
const buildUsersTable = require("./buildUsersTable");
const buildWishlistItemsTable = require("./buildWishlistItemsTable");
const buildWishlistsTable = require("./buildWishlistsTable");

// Import other table creation modules here...

// Function to seed all tables
async function seedAllTables() {
  console.log("STARTING TO SEED ALL TABLES");
  try {
    await buildAuthorsTable();
    await buildBooksTable();
    await buildColoristsTable();
    await buildGlobalRatingsTable();
    await buildIllustratorsTable();
    await buildInkersTable();
    await buildLetterersTable();
    await buildPencillersTable();
    await buildPublishersTable();
    await buildSeriesTable();
    await buildUsersBooksTable();
    await buildUsersRatingsTable();
    await buildUsersTable();
    await buildWishlistItemsTable();
    await buildWishlistsTable();
    // Execute creation functions for other tables here...

    console.log("All tables created successfully!");
  } catch (error) {
    console.error("Error creating tables:", error.message);
    throw error;
  }
}

module.exports = {
  seedAllTables,
};
