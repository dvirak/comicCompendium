class UserExistsErrorAPI extends Error {
  constructor(message = "A user with that username already exists") {
    super(message);
    this.status = 401;
    this.name = "UserExistsError";
  }
}

module.exports = UserExistsErrorAPI;
