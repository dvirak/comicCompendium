// PasswordLengthError
class PasswordLengthErrorAPI extends Error {
  constructor(message = "Password must be at least 8 characters") {
    super(message);
    this.status = 401;
    this.name = "PasswordLengthError";
  }
}

module.exports = PasswordLengthErrorAPI;
