// ! ----------------- IMPORTED FILES --------------------------
const { MissingInformationErrorDB, logErrorDB } = require("../../../Errors/DB"); // Error handling utilities
const client = require("../../client"); // Database client connection
// ! -----------------------------------------------------------

/**
 * Retrieves all entries from the specified database table.
 *
 * @param {Object} params - An object containing parameters for the query.
 * @param {string} params.table_name - The name of the database table from which to retrieve all entries.
 * @returns {Promise<Array>} A promise that resolves to an array containing all rows from the specified table.
 * @throws {MissingInformationErrorDB} If the table_name is not provided.
 * @throws {Error} If an error occurs while querying the database.
 *
 * @precondition table_name is provided and is a valid string representing an existing table.
 * @postcondition The function returns a Promise that resolves to an array of all rows from the specified table.
 *                If an error occurs during the query, the function logs the error and throws it.
 */
async function getAllDB({ table_name }) {
  console.log("IN GET ALL DB"); // Log the start of the function execution
  console.log("TABLE NAME = " + table_name); // Log the provided table name

  const query = `
      SELECT *
      FROM ${table_name}s;
    `;

  try {
    // Validate that the table_name parameter is provided
    if (!table_name) {
      throw new MissingInformationErrorDB(
        "Table name was not provided in getAllDB"
      );
    }

    // Query to select all entries from the specified table
    const { rows } = await client.query(query);

    // Return the fetched rows (entries from the specified table)
    return rows;
  } catch (error) {
    // Log any errors that occur and rethrow them for further handling
    logErrorDB("getAllDB", error);
    throw error;
  }
}

// async function test() {
//   console.log("TESTING IN GETALLDB");
//   let table_name = "book_author";
//   let results = await getAllDB({ table_name });
//   console.log(results);
// }

// test();

module.exports = getAllDB;
