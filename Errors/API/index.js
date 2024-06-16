const AuthorizationHeaderErrorAPI = require("./AuthorizationHeaderErrorAPI");
const InputErrorUsersAPI = require("./InputErrorUsersAPI");
const NotLoggedInErrorAPI = require("./NoLogInErrorAPI");
const NotAdminErrorAPI = require("./NotAdminErrorAPI");
const PasswordLengthErrorAPI = require("./PasswordLengthErrorAPI");
const TokenVerificationErrorAPI = require("./TokenVerificationErrorAPI");
const UserCreationErrorAPI = require("./UserCreationErrorAPI");
const UserExistsErrorAPI = require("./UserExistsErrorAPI");
const UserNotFoundErrorAPI = require("./UserNotFoundErrorAPI");
const logErrorAPI = require("./logErrorAPI");
const InputErrorBooksAPI = require("./InputErrorBooksAPI");
const DatabaseConnectionErrorAPI = require("./DatabaseConnectionErrorAPI");
const errorHandlerAPI = require("./errorHandlerAPI");
const BookNotFoundErrorAPI = require("./BookNotFoundErrorAPI");
const AuthenticationErrorLoginAPI = require("./AuthenticationErrorLoginAPI");

module.exports = {
  UserExistsErrorAPI,
  PasswordLengthErrorAPI,
  UserCreationErrorAPI,
  UserNotFoundErrorAPI,
  AuthorizationHeaderErrorAPI,
  InputErrorUsersAPI,
  NotLoggedInErrorAPI,
  NotAdminErrorAPI,
  TokenVerificationErrorAPI,
  logErrorAPI,
  InputErrorBooksAPI,
  DatabaseConnectionErrorAPI,
  errorHandlerAPI,
  BookNotFoundErrorAPI,
  AuthenticationErrorLoginAPI,
};
