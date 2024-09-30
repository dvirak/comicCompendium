const AuthorNotFoundErrorDB = require("./AuthorNotFoundErrorDB");
const BookNotFoundErrorDB = require("./BookNotFoundErrorDB");
const IncorrectPasswordErrorDB = require("./IncorrectPasswordErrorDB");
const MissingAuthorInfoErrorDB = require("./MissingAuthorInfoErrorDB");
const MissingBookInfoErrorDB = require("./MissingBookInfoError");
const MissingInformationErrorDB = require("./MissingInformationErrorDB");
const MissingLoginInfoErrorDB = require("./MissingLoginInfoErrorDB");
const MissingPasswordErrorDB = require("./MissingPasswordErrorDB");
const MissingUsernameErrorDB = require("./MissingUsernameErrorDB");
const NoInfoProvidedErrorDB = require("./NoInfoProvidedErrorDB");
const NoUserProvidedErrorDB = require("./NoUserProvidedErrorDB");
const NotAuthorizedErrorDB = require("./NotAuthorizedErrorDB");
const NotFoundErrorDB = require("./NotFoundErrorDB");
const UserNotFoundErrorDB = require("./UserNotFoundErrorDB");
const logErrorDB = require("./logErrorDB");

module.exports = {
  IncorrectPasswordErrorDB,
  NoUserProvidedErrorDB,
  UserNotFoundErrorDB,
  NoInfoProvidedErrorDB,
  logErrorDB,
  MissingLoginInfoErrorDB,
  MissingUsernameErrorDB,
  MissingPasswordErrorDB,
  MissingBookInfoErrorDB,
  BookNotFoundErrorDB,
  MissingAuthorInfoErrorDB,
  AuthorNotFoundErrorDB,
  MissingInformationErrorDB,
  NotFoundErrorDB,
  NotAuthorizedErrorDB,
};
