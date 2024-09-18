const client = require("../../client");

async function createRelationsDB(book_id, relationType, relation_id) {
  const relationTable = `book_${
    relationType === "series" ? "serie" : relationType
  }s`;
  const query = `INSERT INTO ${relationTable} (book_id, ${relationType}_id) 
  VALUES ($1, $2) 
  ON CONFLICT DO NOTHING`;

  const { rows } = await client.query(query, [book_id, relation_id]);
  return rows;
}

module.exports = createRelationsDB;
