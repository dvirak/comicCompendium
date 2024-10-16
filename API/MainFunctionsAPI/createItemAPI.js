// ! ----------------- IMPORTED FILES --------------------------
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
 * Description: Creates a new item in the specified table based on the provided `item_name`.
 *
 * This function checks if an item with the same name already exists in the specified table. If the item does not
 * exist, it creates a new entry in the database. If an item with the same name is found, an error is thrown.
 *
 * Middleware: None required.
 *
 * Request Body:
 * - `item_name` (string): The name of the item to create.
 *
 * Response:
 * - Success: Returns the created item object with a 201 status code upon successful creation.
 * - Failure: Returns an error indicating whether required information is missing or if the item already exists.
 *
 * @param {Object} req - The request object, containing the `item_name` in the request body.
 * @param {Object} res - The response object used to send back the created item or an error message.
 * @param {Function} next - The next middleware function for error handling.
 * @param {string} table_name - The name of the database table where the item will be created.
 *
 * @returns {Promise<void>} Sends the created item object as a JSON response with a status code of 201 upon success.
 *
 * @throws {MissingInformationErrorAPI} If either `item_name` or `table_name` is missing.
 * @throws {ItemAlreadyExistsErrorAPI} If an item with the same name already exists in the specified table.
 * @throws {Error} For any unexpected errors encountered during the database interaction.
 *
 * @precondition The request must contain a valid `item_name` in the body and a valid `table_name` must be provided.
 * @postcondition A new item is created in the specified table, or an appropriate error is thrown if the item already exists.
 */
async function createItemAPI(req, res, next, table_name) {
  const item_name = req.body.item_name;
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
        `${item_name} already exists in the ${table_name} table`
      );
    } else {
      // Create a new item record in the database
      const createdItem = await createItemDB({ table_name, item_name });

      // Send the created item object in the response
      res.status(201).json(createdItem);
    }
  } catch (error) {
    // Log the error and pass it to the error-handling middleware
    logErrorAPI("createItemAPI", error, next);
  }
}

module.exports = createItemAPI;
