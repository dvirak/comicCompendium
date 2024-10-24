// ! ----------------- IMPORTED FILES --------------------------
const { NotFoundErrorDB, logErrorDB } = require("../../../Errors/DB"); // Database error handling functions
const client = require("../../client"); // Database client for executing queries
const { formatGetRelationQueries } = require("./helpers");
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
  console.log("In getRelationItemsDB");
  // Generate individual SELECT queries for each relation type
  const query = formatGetRelationQueries(main_item, relations);

  try {
    // Execute the query and retrieve results
    const { rows } = await client.query(query, [main_item_id]);
    if (rows.length === 0) {
      throw new NotFoundErrorDB(
        `No relations were found for the ${main_item} where ID = ${main_item_id}`
      );
    }

    return rows; // Return the retrieved rows
  } catch (error) {
    // Log error and rethrow it for further handling
    logErrorDB("getRelationItems", error);
    throw error;
  }
}

module.exports = getRelationItemsDB; // Export the function for use in other modules
