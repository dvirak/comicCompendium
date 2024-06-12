// ! ----------------- IMPORTED LIBRARIES --------------------------
const bcrypt = require("bcrypt");
// ! -----------------------------------------------------------

// ! ---------------- IMPORTED LOCAL FILES --------------------
const { getUserByUsernameDB, inputCheck } = require("./Helpers");
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

    // If no user is found with the provided username, return null
    if (!user) {
      console.log("No user found");
      return {
        status: false,
        name: "UserNotFoundError",
        message: "No user found",
      };
    }

    // Retrieve the hashed password from the user object
    const hashedPassword = user.password;

    // Compare the provided password with the hashed password retrieved from the database
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);

    // If the passwords do not match, return null
    if (!passwordsMatch) {
      console.log("Passwords did not match");
      return {
        status: false,
        name: "IncorrectPasswordError",
        message: "Incorrect Password",
      };
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
    throw error;
  }
}

module.exports = confirmUser;
