function formatDeleteRelationQueriesDB(relations) {
  const queries = relations.map((relation) => {
    `DELETE * FROM book_${relation === "series" ? "serie" : relation}s
  WHERE book_id = $1 AND ${relation}_id = $2`;
  });
}
