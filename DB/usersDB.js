const client = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

/* 
createUser receives values from a new patron to the website and pushes them into the Database so they can access their data later
Pre-Condition: A new user with no profile saved, and the following information from the user:
  UNIQUE username, password, first_name, last_name, preferred_name, phone, email, admin status
Post-Condition: Returns the userinfomration that was added to the database
*/
async function createUser({
  username,
  password,
  first_name,
  last_name,
  preferred_name,
  phone,
  email,
  admin,
}) {
  console.log("CREATING USER: " + username);

  // use bcrypt to "hash" a function by SALT_COUNT to create unique hashedPassword that is more secure
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password, first_name, last_name, preferred_name, phone, email, admin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (username) DO NOTHING 
      RETURNING *
      `,
      [
        username,
        hashedPassword,
        first_name,
        last_name,
        preferred_name,
        phone,
        email,
        admin,
      ]
    );

    console.log("USER CREATED: " + user.username);

    return user;
  } catch (error) {
    console.log(`Error occurred in the createUser Db Call, ${error}`);
    throw error;
  }
}

module.exports = {
  createUser,
};