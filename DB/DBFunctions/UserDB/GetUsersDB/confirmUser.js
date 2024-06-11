// ! ----------------- IMPORTED LIBRARIES --------------------------
const bcrypt = require("bcrypt");
// ! -----------------------------------------------------------

// ! ---------------- IMPORTED LOCAL FILES --------------------
const { getUserByUsernameDB } = require("./Helpers");
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
  const inpuCheckResults = inputCheck(username, password);
  if (inpuCheckResults.status === false) {
    return inpuCheckResults;
  }

  try {
    // Retrieve user information from the database based on the provided username
    const user = await getUserByUsernameDB(username);

    // If no user is found with the provided username, return null
    if (!user) {
      console.log("No user found");
      return { status: false, message: "No user found" };
    }

    // Retrieve the hashed password from the user object
    const hashedPassword = user.password;

    // Compare the provided password with the hashed password retrieved from the database
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);

    // If the passwords do not match, return null
    if (!passwordsMatch) {
      console.log("Passwords did not match");
      return { status: false, message: "Incorrect Password" };
    }

    // If the passwords match, delete the password field from the user object
    delete user.password;

    // Return the user object without the password field
    return { status: true, message: "Password confirmed", user };
  } catch (error) {
    // Throw any caught errors for handling by the caller
    throw error;
  }
}

function inputCheck(username, password) {
  if (!username && !password) {
    // Log an error message if either username or password is missing
    console.log("No username or password provided");
    return { status: false, message: "No username or password provided" };
  }
  if (!username) {
    // Log an error message if either username or password is missing
    console.log("No username provided");
    return { status: false, message: "No username provided" };
  }
  if (!password) {
    // Log an error message if either username or password is missing
    console.log("No password provided");
    return { status: false, message: "No password provided" };
  }
}

module.exports = { confirmUser };
