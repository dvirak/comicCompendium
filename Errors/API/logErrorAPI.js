// ! ----------------- IMPORTED FILES --------------------------
const fs = require("fs");
// ! -----------------------------------------------------------

/**
 * Function to log errors to console and optionally to a log file.
 *
 * @param {string} programName - The name of the program or function where the error occurred.
 * @param {Error} error - The error object containing details about the error.
 * @param {Function} next - The next middleware function to handle the error.
 */
function logErrorAPI(programName, error, next) {
  console.error(`API Error in ${programName}:`, error);

  // Append error to a log file (optional)
  const logMessage = `Error in ${programName}: ${error}\n`;
  fs.appendFile("error.log", logMessage, (err) => {
    if (err) console.error("Error writing to error log:", err);
  });

  // Send an appropriate error response using next()
  next({
    status: error.status || 500,
    name: error.name,
    message: error.message,
  });
}

module.exports = logErrorAPI;
