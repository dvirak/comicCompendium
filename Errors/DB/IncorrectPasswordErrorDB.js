class IncorrectPasswordErrorDB extends Error {
  constructor(message = "Incorrect password") {
    super(message);
    this.name = "IncorrectPasswordErrorDB";
    this.status = false;
  }
}

module.exports = IncorrectPasswordErrorDB;
