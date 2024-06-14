class NoInfoProvidedErrorDB extends Error {
  constructor(message = "No information was provided for update") {
    super(message);
    this.name = "NoInfoProvidedErrorDB";
    this.status = false;
  }
}

module.exports = NoInfoProvidedErrorDB;
