async function buildPencillersTable() {
  console.log("STARTING TO BUILD Pencillers TABLE...");
  try {
    await client.query(`
  CREATE TABLE pencillers (
    id SERIAL PRIMARY KEY,
    penciller_name VARCHAR(255) UNIQUE
  );
`);
  } catch (error) {
    console.error("Error creating Pencillers tables: " + error.message);
    throw error;
  }
}

module.exports = {
  buildPencillersTable,
};

//     await client.query(`
//   CREATE TABLE pencillers (
//     id SERIAL PRIMARY KEY,
//     penciller_name VARCHAR(255) UNIQUE
//   );
// `);
