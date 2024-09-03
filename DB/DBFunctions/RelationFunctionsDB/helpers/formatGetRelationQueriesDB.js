/**
 * Formats SQL queries to retrieve related items for a specified main item.
 * @param {string} main_item - The main item type (e.g., 'book').
 * @param {Array<string>} relations - An array of relation types to retrieve (e.g., ['author', 'genre']).
 * @returns {string} - A SQL query string that combines all relation queries using UNION ALL.
 */
function formatGetRelationQueries(main_item, relations) {
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

  const query = queries.join(` UNION ALL `); // Combine all SELECT queries into a single query using UNION ALL
  return query; // Return the final combined query
}

module.exports = formatGetRelationQueries; // Export the function for use in other modules
