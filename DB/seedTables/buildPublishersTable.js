async function buildPublishersTable() {
  console.log("STARTING TO BUILD Publishers TABLE...");
  try {
    await client.query(`
  CREATE TABLE publishers (
    id SERIAL PRIMARY KEY,
    publisher_name VARCHAR(255) UNIQUE
  );
`);
  } catch (error) {
    console.error("Error creating Publishers tables: " + error.message);
    throw error;
  }
}

module.exports = {
  buildPublishersTable,
};

//     await client.query(`
//   CREATE TABLE publishers (
//     id SERIAL PRIMARY KEY,
//     publisher_name VARCHAR(255) UNIQUE
//   );
// `);
