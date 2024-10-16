// ! ---------------- IMPORTED FILES --------------------------
const {
  logErrorDB,
  MissingInformationErrorDB,
  NotFoundErrorDB,
} = require("../../../Errors/DB");
const client = require("../../client");
const getSingleBookDB = require("../BookDB/GetBooksDB/getSingleBookDB");
const { getItemDB } = require("../MainFunctionsDB");
// ! -----------------------------------------------------------

/**
 * Description: Deletes a specified relation (e.g., author, genre, series) between a book and another item (like an author or genre).
 * The function retrieves the book and the item based on the provided `book_id` or `title` and the `item_id` or `item_name`,
 * and then deletes the relation from the database. The relation is dynamically specified (author, genre, etc.).
 *
 * This function:
 *  - Fetches the book and related item based on the provided identifiers or names.
 *  - Deletes the relation between them if both exist.
 *
 * @param {number} book_id - The ID of the book. Either this or the `title` must be provided.
 * @param {number} item_id - The ID of the item (author, genre, etc.). Either this or the `item_name` must be provided.
 * @param {string} relation - The type of relation to delete (e.g., "author", "genre", "series").
 * @param {string} title - The title of the book (optional if `book_id` is provided).
 * @param {string} item_name - The name of the related item (optional if `item_id` is provided).
 *
 * @returns {Promise<Object>} An object containing a success message when the relation is deleted successfully.
 * @throws {MissingInformationErrorDB} If insufficient information is provided (missing book info, relation, or item info).
 * @throws {NotFoundErrorDB} If the book or item is not found in the database.
 * @throws {Error} Logs and rethrows any other database-related errors.
 *
 * @precondition Either `book_id` or `title` must be provided to identify the book.
 * @precondition Either `item_id` or `item_name` must be provided to identify the related item.
 * @postcondition The specified relation between the book and the item is deleted from the database.
 */
async function deleteRelationDB(book_id, item_id, relation, title, item_name) {
  console.log("In deleteRelationDB");

  let book;
  let item;
  const query = `DELETE 
  FROM book_${relation === "series" ? "serie" : relation}s
  WHERE book_id = $1 AND ${relation}_id = $2`;

  try {
    // Check if the necessary book information is provided
    if (!book_id && !title) {
      throw new MissingInformationErrorDB(
        "Please provide the book information to deleteRelationDB"
      );
    }

    // Check if the relation type is provided
    if (!relation) {
      throw new MissingInformationErrorDB(
        "Please provide the relation you are trying to delete to deleteRelationDB"
      );
    }

    // Check if the item information is provided
    if (!item_name && !item_id) {
      throw new MissingInformationErrorDB(
        "Please provide the relation item information to deleteRelationDB"
      );
    }

    // Fetch the book based on book_id or title
    book = book_id
      ? await getSingleBookDB({ book_id })
      : await getSingleBookDB({ title });

    // Fetch the related item (author, genre, etc.) based on item_id or item_name
    item = item_id
      ? await getItemDB({ table_name: relation, item_id })
      : await getItemDB({ table_name: relation, item_name });

    // Throw an error if the book or item is not found
    if (!book) {
      throw new NotFoundErrorDB(
        "The book you were searching for was not found"
      );
    } else if (!item) {
      throw new NotFoundErrorDB(
        `The ${relation} you were searching for was not found`
      );
    } else {
      // Set book_id and item_id from the retrieved records
      book_id = book.id;
      item_id = item.id;
    }

    // If both the book and item are found, delete the relation
    if (book && item) {
      const {
        rows: [deleted_item],
      } = await client.query(query, [book_id, item_id]);

      // Return success message
      return {
        status: "Success!",
        message: `${
          item_name ? item_name : item[`${relation}_name`]
        } no longer ${relation} for ${title ? title : book.title}`,
      };
    }
  } catch (error) {
    // Log and rethrow any errors encountered during the process
    logErrorDB("deleteRelationDB", error);
    throw error;
  }
}

module.exports = deleteRelationDB;
