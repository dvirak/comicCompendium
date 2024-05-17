async function buildUsersTable() {
  console.log("STARTING TO BUILD Users TABLE...");
  try {
    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      preferred_name VARCHAR(255) NULL,
      phone BIGINT NOT NULL,
      email VARCHAR(255) NOT NULL,
      admin BOOLEAN NOT NULL DEFAULT false
    );
      `);
  } catch (error) {
    console.error("Error creating Users tables: " + error.message);
    throw error;
  }
}

module.exports = {
  buildUsersTable,
};

// await client.query(`
// CREATE TABLE users (
//   id SERIAL PRIMARY KEY,
//   username VARCHAR(255) UNIQUE NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   first_name VARCHAR(255) NOT NULL,
//   last_name VARCHAR(255) NOT NULL,
//   preferred_name VARCHAR(255) NULL,
//   phone BIGINT NOT NULL,
//   email VARCHAR(255) NOT NULL,
//   admin BOOLEAN NOT NULL DEFAULT false
// );
//   `);
