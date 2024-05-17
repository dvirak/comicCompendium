async function buildLetterersTable() {
  console.log("STARTING TO BUILD Letterers TABLE...");
  try {
    await client.query(`
  CREATE TABLE letterers (
    id SERIAL PRIMARY KEY,
    letterer_name VARCHAR(255) UNIQUE
  );
`);
  } catch (error) {
    console.error("Error creating Letterers tables: " + error.message);
    throw error;
  }
}

module.exports = {
  buildLetterersTable,
};

//     await client.query(`
//   CREATE TABLE letterers (
//     id SERIAL PRIMARY KEY,
//     letterer_name VARCHAR(255) UNIQUE
//   );
// `);
