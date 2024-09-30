const client = require("../../client");

/**
 * Description: Inserts a new relation entry into the appropriate relation table
 * for a specified book and relation type. If the entry already exists,
 * it performs no action (ignores the conflict).
 *
 * @param {string} book_id - The ID of the book to which the relation is associated.
 * @param {string} relationType - The type of relation being added (e.g., "author", "publisher").
 * @param {string} relation_id - The ID of the related entity.
 * @returns {Promise<Array>} An array of rows affected by the insert operation (should be empty if a conflict occurs).
 * @throws {Error} If an error occurs during the database operation.
 *
 * @precondition The `book_id`, `relationType`, and `relation_id` parameters must be valid strings.
 * @postcondition A new relation entry is either inserted into the database or ignored if it already exists.
 */
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
