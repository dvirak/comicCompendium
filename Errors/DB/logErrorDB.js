const fs = require("fs");

/**
 * Function to log database errors to console and optionally to a log file.
 *
 * @param {string} programName - The name of the program or function where the error occurred.
 * @param {Error} error - The error object containing details about the database error.
 * @param {Function} next - The next middleware function to handle the error.
 */
function logErrorDB(programName, error, next) {
  console.error(`Database Error in ${programName}:`, error);

  // Append error to a log file (optional)
  const logMessage = `Database Error in ${programName}: ${error}\n`;
  fs.appendFile("database_error.log", logMessage, (err) => {
    if (err) console.error("Error writing to database error log:", err);
  });

  // Send an appropriate error response using next()
  // next(error);
}

module.exports = logErrorDB;
