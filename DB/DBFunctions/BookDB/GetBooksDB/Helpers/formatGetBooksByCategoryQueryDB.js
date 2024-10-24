/**
 * Formats a SQL query to retrieve books based on specified categories.
 * @param {Object} categories - An object where the keys are category names and the values are category IDs.
 * @returns {Object} - An object containing the formatted SQL query string and an array of values for query parameters.
 */
function formatGetBooksByCategoryQueryDB(categories) {
  let joinClauses = []; // Array to store SQL JOIN clauses
  let values = []; // Array to store values for SQL query parameters
  let whereClauses = []; // Array to store conditions for the WHERE clause

  // Construct JOIN and WHERE clauses based on categories
  for (const [category, id] of Object.entries(categories)) {
    let pluralCategory = category === "series" ? "serie" : category;
    joinClauses.push(
      `JOIN book_${pluralCategory}s ON books.id = book_${pluralCategory}s.book_id`
    );
    joinClauses.push(
      `JOIN ${pluralCategory}s ON book_${pluralCategory}s.${category}_id = ${pluralCategory}s.id`
    );
    whereClauses.push(`${pluralCategory}s.id`); // Add the condition for the category ID
    values.push(id); // Add the category ID to the values array
  }

  const joinQuery = joinClauses.join("\n"); // Combine all JOIN clauses into a single string

  // Construct the full SQL query with dynamic JOIN and WHERE clauses
  const query = `
  SELECT books.*
  FROM books
  ${joinQuery}
  WHERE ${whereClauses
    .map((element, index) => `${element} = $${index + 1}`)
    .join(" AND ")}
  `;

  return { query, values }; // Return the query string and the corresponding values
}

module.exports = formatGetBooksByCategoryQueryDB; // Export the function for use in other modules
