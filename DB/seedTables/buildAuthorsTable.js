async function buildAuthorsTable() {
  console.log("STARTING TO BUILD Authors TABLE...");
  try {
    await client.query(`
  CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    author_name VARCHAR(255) UNIQUE
  );
`);
  } catch (error) {
    console.error("Error creating Authors tables: " + error.message);
    throw error;
  }
}

module.exports = {
  buildAuthorsTable,
};

//     await client.query(`
//   CREATE TABLE authors (
//     id SERIAL PRIMARY KEY,
//     author_name VARCHAR(255) UNIQUE
//   );
// `);
