async function buildBooksTable() {
  console.log("STARTING TO BUILD BOOKS TABLE...");
  try {
    await client.query(`
  CREATE TABLE books (
    id SERIAL PRIMARY KEY,
  );
`);
  } catch (error) {
    console.error("Error creating BOOKS tables: " + error.message);
    throw error;
  }
}

module.exports = {
  buildBooksTable,
};
