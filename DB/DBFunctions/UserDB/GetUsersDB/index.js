// Import the getSingleUserDB function from the getSingleUserDB.js file
const { getSingleUserDB } = require("./getSingleUserDB");

// Import the getAllUsersBasicDB function from the getAllUsersBasicDB.js file
const { getAllUsersDB } = require("./getAllUsersDB");

// Export the imported functions to make them available for use in other modules
module.exports = {
  getSingleUserDB,
  getAllUsersDB,
};
