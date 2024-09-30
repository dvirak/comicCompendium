/**
 * Description: Formats SQL DELETE queries for removing specified relations
 * from the database based on the provided relation types.
 *
 * @param {Array<string>} relations - An array of relation types (e.g., "author", "publisher")
 *                                     to be deleted from the database.
 * @returns {Array<string>} An array of formatted SQL DELETE queries.
 * @throws {Error} If an error occurs during query formatting.
 *
 * @precondition The `relations` parameter must be a non-empty array of strings.
 * @postcondition An array of DELETE queries is generated for each relation type.
 */
function formatDeleteRelationQueriesDB(relations) {
  const queries = relations.map((relation) => {
    return `DELETE FROM book_${relation === "series" ? "serie" : relation}s
    WHERE book_id = $1 AND ${relation}_id = $2`;
  });
  return queries;
}

module.exports = formatDeleteRelationQueriesDB;
