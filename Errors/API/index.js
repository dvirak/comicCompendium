const AuthorizationHeaderErrorAPI = require("./AuthorizationHeaderErrorAPI");
const InputErrorAPI = require("./InputErrorAPI");
const NotLoggedInErrorAPI = require("./NoLogInErrorAPI");
const NotAdminErrorAPI = require("./NotAdminErrorAPI");
const PasswordLengthErrorAPI = require("./PasswordLengthErrorAPI");
const TokenVerificationErrorAPI = require("./TokenVerificationErrorAPI");
const UserCreationErrorAPI = require("./UserCreationErrorAPI");
const UserExistsErrorAPI = require("./UserExistsErrorAPI");
const UserNotFoundErrorAPI = require("./UserNotFoundErrorAPI");
const logError = require("./logErrorAPI");

module.exports = {
  UserExistsErrorAPI,
  PasswordLengthErrorAPI,
  UserCreationErrorAPI,
  UserNotFoundErrorAPI,
  AuthorizationHeaderErrorAPI,
  InputErrorAPI,
  NotLoggedInErrorAPI,
  NotAdminErrorAPI,
  TokenVerificationErrorAPI,
  logError,
};
