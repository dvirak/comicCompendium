const IncorrectPasswordErrorDB = require("./IncorrectPasswordErrorDB");
const NoInfoProvidedErrorDB = require("./NoInfoProvidedErrorDB");
const NoUserProvidedErrorDB = require("./NoUserProvidedErrorDB");
const UserNotFoundErrorDB = require("./UserNotFoundErrorDB");
const logErrorDB = require("./logErrorDB");

module.exports = {
  IncorrectPasswordErrorDB,
  NoUserProvidedErrorDB,
  UserNotFoundErrorDB,
  NoInfoProvidedErrorDB,
  logErrorDB,
};
