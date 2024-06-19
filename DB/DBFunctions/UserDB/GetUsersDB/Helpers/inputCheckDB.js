const {
  MissingLoginInfoErrorDB,
  MissingUsernameErrorDB,
  MissingPasswordErrorDB,
} = require("../../../../../Errors/DB");

function inputCheckDB(username, password) {
  if (!username && !password) {
    // Log an error message if either username or password is missing
    throw new MissingLoginInfoErrorDB();
  }
  if (!username) {
    // Log an error message if either username or password is missing
    throw new MissingUsernameErrorDB();
  }
  if (!password) {
    // Log an error message if either username or password is missing
    throw new MissingPasswordErrorDB();
  }
  return { status: true };
}

module.exports = inputCheckDB;
