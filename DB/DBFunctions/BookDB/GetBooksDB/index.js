// Import the getSingleBookDB function from the getSingleBookDB.js file
const { getSingleBookDB } = require("./getSingleBookDB");

// Import the getAllBooksBasicDB function from the getAllBooksBasicDB.js file
const { getAllBooksBasicDB } = require("./getAllBooksBasicDB");

// Export the imported functions to make them available for use in other modules
module.exports = {
  getSingleBookDB,
  getAllBooksBasicDB,
};
