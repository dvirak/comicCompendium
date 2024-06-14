const PasswordLengthErrorAPI = require("./PasswordLengthErrorAPI");
const UserCreationErrorAPI = require("./UserCreationErrorAPI");
const UserExistsErrorAPI = require("./UserExistsErrorAPI");
const UserNotFoundErrorAPI = require("./UserNotFoundErrorAPI");

module.exports = {
  UserExistsErrorAPI,
  PasswordLengthErrorAPI,
  UserCreationErrorAPI,
  UserNotFoundErrorAPI,
};
