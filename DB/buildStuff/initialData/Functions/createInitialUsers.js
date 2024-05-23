const { users } = require("../Data/userData");
const { createUserDB } = require("../../../DBFunctions/UserDB/createUserDB");

// Create initial users
async function createInitialUsers() {
  console.log("CREATING INITIAL USERS...");

  try {
    for (const user of users) {
      const newUser = await createUserDB(user);
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createInitialUsers,
};
