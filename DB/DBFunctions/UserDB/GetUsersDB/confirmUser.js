// ! ---------------- IMPORTED LOCAL FILES --------------------
const {
  getUserByUsernameDB,
  inputCheck,
  UserNotFoundError,
  comparePasswords,
  IncorrectPasswordError,
} = require("./Helpers");
// ! -----------------------------------------------------------

/**
 * Confirms user credentials based on the provided username and password.
 * If the credentials are valid, returns the user object without the password field.
 * If either username or password is missing, logs an error and returns null.
 * If no user is found with the provided username, returns null.
 * If the provided password does not match the hashed password in the database, returns null.
 *
 * @param {Object} param0 - Object containing the username and password to confirm.
 * @param {string} param0.username - The username to confirm.
 * @param {string} param0.password - The password to confirm.
 * @returns {Object|null} The user object without the password field if credentials are valid, otherwise null.
 * @throws {Error} If an error occurs while retrieving user information or comparing passwords.
 */
async function confirmUser(username, password) {
  console.log("IN CONFIRM USER");
  // Check if either username or password is missing
  const inputCheckResults = inputCheck(username, password);
  if (inputCheckResults.status === false) {
    return inputCheckResults;
  }

  try {
    // Retrieve user information from the database based on the provided username
    const user = await getUserByUsernameDB(username);

    // If no user is found with the provided username, return UserNotFoundError
    if (!user) {
      throw new UserNotFoundError();
    }

    // Compare the provided password with the user password retrieved from the database
    const passwordsMatch = await comparePasswords(password, user.password);

    // If the passwords do not match, throw password error
    if (!passwordsMatch) {
      throw new IncorrectPasswordError();
    }

    // If the passwords match, delete the password field from the user object
    delete user.password;

    // Return the user object without the password field
    return {
      status: true,
      name: "UserConfirmed",
      message: "Password confirmed",
      user,
    };
  } catch (error) {
    // Throw any caught errors for handling by the caller
    if (
      error instanceof UserNotFoundError ||
      error instanceof IncorrectPasswordError
    ) {
      return {
        status: false,
        name: error.name,
        message: error.message,
      };
    } else {
      throw error;
    }
  }
}

module.exports = confirmUser;
