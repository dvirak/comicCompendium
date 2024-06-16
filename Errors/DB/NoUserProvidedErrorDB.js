class NoUserProvidedErrorDB extends Error {
  constructor(message = "Either user_id or username must be provided") {
    super(message);
    this.name = "NoUserProvidedErrorDB";
    this.status = false;
  }
}

module.exports = NoUserProvidedErrorDB;
