// helpers/errors.js

class UserNotFoundError extends Error {
  constructor(message = "No user found") {
    super(message);
    this.name = "UserNotFoundError";
    this.status = false;
  }
}

class IncorrectPasswordError extends Error {
  constructor(message = "Incorrect password") {
    super(message);
    this.name = "IncorrectPasswordError";
    this.status = false;
  }
}

class NoUserProvidedError extends Error {
  constructor(message = "Either user_id or username must be provided") {
    super(message);
    this.name = "NoUserProvidedError";
    this.status = false;
  }
}

module.exports = {
  UserNotFoundError,
  IncorrectPasswordError,
  NoUserProvidedError,
};
