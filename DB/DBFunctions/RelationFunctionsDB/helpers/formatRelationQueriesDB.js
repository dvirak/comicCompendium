function formatRelationQueries(main_item, relations) {
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

  const query = queries.join(` UNION ALL `); // Combine all SELECT queries with UNION ALL
  return query;
}

module.exports = formatRelationQueries;
