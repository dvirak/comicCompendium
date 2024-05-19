const { users } = require("../Data/userData");
const { createUser } = require("../../../usersDB");

// Create initial users
async function createInitialUsers() {
  console.log("CREATING INITIAL USERS...");

  try {
    for (const user of users) {
      const newUser = await createUser(user);
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createInitialUsers,
};
