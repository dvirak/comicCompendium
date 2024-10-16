// ! ---------------- IMPORTED FILES --------------------------
const {
  getItemDB,
  createItemDB,
} = require("../../DB/DBFunctions/MainFunctionsDB");
const {
  logErrorAPI,
  ItemAlreadyExistsErrorAPI,
  MissingInformationErrorAPI,
} = require("../../Errors/API");
const { NotFoundErrorDB } = require("../../Errors/DB");
// ! -----------------------------------------------------------

/**
 * Description: Creates a new item in the specified table.
 * This function checks if an item with the same name already exists in the database. If not, it creates the item;
 * otherwise, it throws an error indicating that the item already exists.
 *
 * Middleware: None required.
 * Request Body:
 * - `name` (string): The name of the item to create.
 * Note: Ensure that the table name is passed as a function argument.
 *
 * @param {Object} req - The request object containing information about the HTTP request.
 * @param {Object} res - The response object used to send back the appropriate HTTP response.
 * @param {Function} next - The next middleware function for error handling.
 * @param {string} table_name - The name of the table where the item will be created.
 * @returns {Promise<void>} Returns the created item as a JSON response with status code 201 upon success.
 * @throws {MissingInformationErrorAPI} If either `item_name` or `table_name` is missing.
 * @throws {ItemAlreadyExistsErrorAPI} If an item with the same name already exists in the specified table.
 * @throws {Error} Any other errors encountered during the database interactions.
 *
 * @precondition The request must contain an `item_name` in the request body and a valid `table_name`.
 * @postcondition A new item is created in the specified table, or an appropriate error is thrown if it already exists.
 */
async function createItemAPI(req, res, next, table_name) {
  const item_name = req.body.name;
  console.log(`Creating ${item_name} in the ${table_name} table`);

  try {
    // Check if any required fields are missing
    if (!item_name || !table_name) {
      throw new MissingInformationErrorAPI(
        !item_name
          ? `You are missing the item_name in createItemAPI`
          : `You are missing the table_name in createItemAPI`
      );
    }

    let itemExists;

    // Check if an item with the same name already exists
    try {
      itemExists = await getItemDB({ table_name, item_name });
    } catch (error) {
      if (error instanceof NotFoundErrorDB) {
        itemExists = null; // No existing item found
      } else {
        throw error; // Rethrow unexpected errors
      }
    }

    // If the item already exists, throw an error
    if (itemExists) {
      throw new ItemAlreadyExistsErrorAPI(
        `${item_name} already exists in the ${table_name}s Table`
      );
    } else {
      // Create a new item record in the database
      const createdItem = await createItemDB({ table_name, item_name });

      // Send the created item object in the response
      res.status(201).json(createdItem);
    }
  } catch (error) {
    // Log the error and pass it to the error handling middleware
    logErrorAPI("createItemAPI", error, next);
  }
}

module.exports = createItemAPI;
