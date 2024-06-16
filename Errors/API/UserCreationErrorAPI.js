class UserCreationErrorAPI extends Error {
  constructor(message = "There was a problem registering you") {
    super(message);
    this.status = 401;
    this.name = "UserCreationError";
  }
}

module.exports = UserCreationErrorAPI;
