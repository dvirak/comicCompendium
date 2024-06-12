function inputCheck(username, password) {
  if (!username && !password) {
    // Log an error message if either username or password is missing
    console.log("No username or password provided");
    return {
      status: false,
      name: "MissingCredentialsError",
      message: "No username or password provided",
    };
  }
  if (!username) {
    // Log an error message if either username or password is missing
    console.log("No username provided");
    return {
      status: false,
      name: "MissingUsernameError",
      message: "No username provided",
    };
  }
  if (!password) {
    // Log an error message if either username or password is missing
    console.log("No password provided");
    return {
      status: false,
      name: "MissingPasswordError",
      message: "No password provided",
    };
  }
  return true;
}

module.exports = inputCheck;
