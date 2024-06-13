class UserNotFoundErrorDB extends Error {
  constructor(message = "No user found") {
    super(message);
    this.name = "UserNotFoundErrorDB";
    this.status = false;
  }
}

module.exports = UserNotFoundErrorDB;
