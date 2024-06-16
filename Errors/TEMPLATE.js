class DatabaseConnectionError extends Error {
  constructor(message = "There was an issue trying to reach the database") {
    this.name = DatabaseConnectionError;
    this.status = 500;
  }
}

module.exports = DatabaseConnectionError;
