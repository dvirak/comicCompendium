/**
 * Formats SQL queries to retrieve related items for a specified main item.
 * @param {string} main_item - The main item type (e.g., 'book').
 * @param {Array<string>} relations - An array of relation types to retrieve (e.g., ['author', 'genre']).
 * @returns {string} - A SQL query string that combines all relation queries using UNION ALL.
 */
function formatGetRelationQueries(main_item, relations) {
  console.log("IN formatGetRelationQueries");
  // Map each relation type to its corresponding SQL SELECT query
  const queries = relations.map(
    (relation) => `
  SELECT '${relation}' as relation_type, ${
      relation === "series" ? "serie" : relation
    }s.id as relation_id, ${
      relation === "series" ? "serie" : relation
    }s.${relation}_name as relation_name
  FROM ${relation === "series" ? "serie" : relation}s
  JOIN ${main_item}_${
      relation === "series" ? "serie" : relation
    }s ON ${main_item}_${
      relation === "series" ? "serie" : relation
    }s.${relation}_id = ${relation === "series" ? "serie" : relation}s.id
  WHERE ${main_item}_${
      relation === "series" ? "serie" : relation
    }s.${main_item}_id = $1
  `
  );

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

  const query = queries.join(` UNION ALL `); // Combine all SELECT queries into a single query using UNION ALL
  console.log(query);
  return query; // Return the final combined query
}

module.exports = formatGetRelationQueries; // Export the function for use in other modules
