/**
 * Formats SQL queries to retrieve related items for a specified main item.
 * @param {string} main_item - The main item type (e.g., 'book').
 * @param {Array<string>} relations - An array of relation types to retrieve (e.g., ['author', 'genre']).
 * @returns {string} - A SQL query string that combines all relation queries using UNION ALL.
 */
function formatGetRelationQueries(main_item, relations) {
  console.log("IN formatGetRelationQueries");
  // Map each relation type to its corresponding SQL SELECT query
  const queries = relations.map((relation) => {
    const itemTable = relation === "series" ? "series" : `${relation}s`;
    const relationID = relation === "series" ? "series.id" : `${relation}s.id`;
    const relationTable =
      relation === "series"
        ? `${main_item}_series`
        : `${main_item}_${relation}s`;

    return `
      SELECT '${relation}' as relation_type, ${relationID} as relation_id, ${itemTable}.${relation}_name as relation_name
      FROM ${itemTable}
      JOIN ${relationTable} ON ${relationTable}.${relation}_id = ${relationID}
      WHERE ${relationTable}.${main_item}_id = $1
  `;
  });

  const query = queries.join(` UNION ALL `); // Combine all SELECT queries into a single query using UNION ALL
  return query; // Return the final combined query
}

module.exports = formatGetRelationQueries; // Export the function for use in other modules

// const queries = relations.map((relation) => {
//   const relationTable = relation === "series" ? "series" : `${relation}s`;
//   const relationalJoinTable = `book_${
//     relation === "series" ? "serie" : relation
//   }s`;
//   const relationIdField = `${relation}_id`;
//   const relationNameField = `${relationTable.slice(0, -1)}_name`;

//   return `
//     SELECT '${relation}' AS relation_type, STRING_AGG(${relationNameField}, ', ') as relation_names
//     FROM ${relationTable}
//     JOIN ${relationalJoinTable}
//       ON ${relationalJoinTable}.${relationIdField} = ${relationTable}.id
//     WHERE ${relationalJoinTable}.${main_item}_id = $1
//     GROUP BY relation_type`;
// });

// console.log(queries);
