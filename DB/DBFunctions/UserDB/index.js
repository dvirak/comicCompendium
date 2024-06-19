const { checkPasswordDB } = require("./checkPasswordDB");
const confirmUserDB = require("./confirmUserDB");
const { createUserDB } = require("./createUserDB");
const updateUserDB = require("./updateUserDB");

module.exports = { checkPasswordDB, confirmUserDB, createUserDB, updateUserDB };

// Import the getSingleUserDB function from the getSingleUserDB.js file
// const { getSingleUserDB } = require("./GetUsersDB/getSingleUserDB");

// // Import the getAllUsersBasicDB function from the getAllUsersBasicDB.js file
// const { getAllUsersDB } = require("./GetUsersDB/getAllUsersDB");

// // Export the imported functions to make them available for use in other modules
// module.exports = {
//   getSingleUserDB,
//   getAllUsersDB,
// };
