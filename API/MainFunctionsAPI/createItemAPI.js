// ! ---------------- IMPORTED FILES -------------------------
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
 * Description: Creates a new item record in the specified table based on the provided request body.
 *
 * This function handles item creation by checking if the item already exists and validating required fields.
 * It requires the user to be authenticated and logs errors using API error handling middleware.
 *
 * Middleware: requireUser - Ensures user is authenticated.
 * Request Body: Requires a key "name" with the item's name as a string.
 * Response: Returns the created item object upon success.
 *
 * @param {Object} req - Express request object containing the item name in req.body.
 * @param {Object} res - Express response object to send the created item object upon success.
 * @param {Function} next - Express next function to pass errors to the error handling middleware.
 * @param {string} table_name - The name of the database table where the item will be created.
 *
 * @throws {MissingInformationErrorAPI} If the request body is missing the item name or the table name.
 * @throws {ItemAlreadyExistsErrorAPI} If an item with the same name already exists in the database.
 * @throws {Error} If an unexpected error occurs during database operations.
 *
 * @precondition The request body must include a key "name" with the item's name as a string.
 * @postcondition On success, a new item record is created in the specified table and the created item is returned in the response.
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

    if (itemExists) {
      // Throw error if item already exists
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
