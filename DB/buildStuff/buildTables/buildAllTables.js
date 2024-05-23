const { buildAuthorsTable } = require("./buildAuthorsTable");
const { buildBooksTable } = require("./buildBooksTable");
const { buildColoristsTable } = require("./buildColoristsTable");
const { buildGlobalRatingsTable } = require("./buildGlobalRatingsTable");
const { buildIllustratorsTable } = require("./buildIllustratorsTable");
const { buildInkersTable } = require("./buildInkersTable");
const { buildLetterersTable } = require("./buildLetterersTable");
const { buildPencillersTable } = require("./buildPencillersTable");
const { buildPublishersTable } = require("./buildPublishersTable");
const { buildSeriesTable } = require("./buildSeriesTable");
const { buildUsersBooksTable } = require("./buildUsersBooksTable");
const { buildUsersRatingsTable } = require("./buildUsersRatingsTable");
const { buildUsersTable } = require("./buildUsersTable");
const { buildWishListItemsTable } = require("./buildWishlistItemsTable");
const { buildWishListsTable } = require("./buildWishlistsTable");
const { buildBookAuthorsTable } = require("./buildBookAuthorsTable");
const { buildBookColoristsTable } = require("./buildBookColoristsTable");
const { buildBookIllustratorsTable } = require("./buildBookIllustratorsTable");
const { buildBookPencillersTable } = require("./buildBookPencillersTable");
const { buildBookInkersTable } = require("./buildBookInkersTable");
const { buildBookSeriesTable } = require("./buildBookSeriesTable");
const { buildBookLetterersTable } = require("./buildBookLetterersTable");
const { buildBookGenresTable } = require("./buildBookGenreTable");
const { buildGenresTable } = require("./buildGenresTable");

// Import other table creation modules here...

// Function to seed all tables
async function seedAllTables() {
  console.log("STARTING TO SEED ALL TABLES...");
  try {
    await buildAuthorsTable();
    await buildColoristsTable();
    await buildIllustratorsTable();
    await buildInkersTable();
    await buildLetterersTable();
    await buildPencillersTable();
    await buildPublishersTable();
    await buildSeriesTable();
    await buildGenresTable();
    await buildUsersTable();
    await buildBooksTable();
    await buildBookAuthorsTable();
    await buildBookColoristsTable();
    await buildBookIllustratorsTable();
    await buildBookPencillersTable();
    await buildBookInkersTable();
    await buildBookSeriesTable();
    await buildBookLetterersTable();
    await buildBookGenresTable();
    await buildGlobalRatingsTable();
    await buildUsersBooksTable();
    await buildUsersRatingsTable();
    await buildWishListsTable();
    await buildWishListItemsTable();

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
