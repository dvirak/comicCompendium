// ! ----------------- IMPORTED FILES --------------------------
const { NotFoundErrorDB, logErrorDB } = require("../../../Errors/DB"); // Database error handling functions
const client = require("../../client"); // Database client for executing queries
// ! -----------------------------------------------------------

/**
 * Description: Retrieves related items for a specified main item from the database.
 * @param {Object} params - An object containing the following properties:
 *   @param {string} main_item - The main item type (e.g., 'book').
 *   @param {number} main_item_id - The ID of the main item.
 *   @param {Array<string>} relations - An array of relation types to retrieve (e.g., ['author', 'genre']).
 * @returns {Promise<Array>} - A promise that resolves to an array of related items.
 * @throws {NotFoundErrorDB} If no relations are found for the specified main item ID.
 */
async function getRelationItemsDB({ main_item, main_item_id, relations }) {
  // Generate individual SELECT queries for each relation type
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

  try {
    console.log("IN TRY BLOCK"); // Debug log to indicate the start of the try block
    console.log(query); // Debug log to show the generated query

    // Execute the query and retrieve results
    const { rows } = await client.query(query, [main_item_id]);
    console.log("THIS IS AFTER THE QUERY"); // Debug log to indicate query completion
    if (rows.length === 0) {
      throw new NotFoundErrorDB(
        `No relations were found for the ${main_item} where ID = ${main_item_id}`
      );
    }

    console.log(rows); // Debug log to show the first row of the result
    return rows; // Return the retrieved rows
  } catch (error) {
    // Log error and rethrow it for further handling
    logErrorDB("getRelationItems", error);
    throw error;
  }
}

module.exports = getRelationItemsDB; // Export the function for use in other modules
