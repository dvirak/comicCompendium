class UserNotFoundErrorAPI extends Error {
  constructor(message = "No user found") {
    super(message);
    this.name = "UserNotFoundErrorAPI";
    this.status = 404;
  }
}

module.exports = UserNotFoundErrorAPI;
