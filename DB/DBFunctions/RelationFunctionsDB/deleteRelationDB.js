const {
  logErrorDB,
  MissingInformationErrorDB,
  NotFoundErrorDB,
} = require("../../../Errors/DB");
const client = require("../../client");
const getSingleBookDB = require("../BookDB/GetBooksDB/getSingleBookDB");
const { getItemDB } = require("../MainFunctionsDB");

/**
 * Description: Deletes a relation between a book and a related item in the database.
 * The function first checks for necessary information, retrieves the corresponding
 * book and item if not directly provided, and then executes the delete operation.
 *
 * @param {string} book_id - The ID of the book from which to delete the relation.
 * @param {string} item_id - The ID of the related item to be deleted.
 * @param {string} relation - The type of relation to delete (e.g., "author", "series").
 * @param {string} [title] - The title of the book (used if book_id is not provided).
 * @param {string} [item_name] - The name of the related item (used if item_id is not provided).
 * @returns {Promise<Object>} An object indicating the success of the operation and a message.
 * @throws {Error} If required information is missing or if the book/item is not found.
 *
 * @precondition At least one of `book_id` or `title` must be provided, and
 * at least one of `item_id` or `item_name` must also be provided.
 * @postcondition A relation entry is deleted from the database if found,
 * otherwise an error is thrown.
 */
async function deleteRelationDB(book_id, item_id, relation, title, item_name) {
  console.log("In deleteRelationDB");
  let book;
  let item;
  const query = `DELETE 
  FROM book_${relation === "series" ? "serie" : relation}s
  WHERE book_id = $1 AND ${relation}_id = $2`;

  try {
    if (!book_id && !title) {
      throw new MissingInformationErrorDB(
        "Please provide the book information to deleteRelationDB"
      );
    }

    if (!relation) {
      throw new MissingInformationErrorDB(
        "Please provide the relation you are trying to delete to deleteRelationDB"
      );
    }

    if (!item_name && !item_id) {
      throw new MissingInformationErrorDB(
        "Please provide the relation item information to deleteRelationDB"
      );
    }

    if (!book_id) {
      book = await getSingleBookDB({ title });
      book_id = book.id;
    }

    if (!item_id) {
      item = await getItemDB({ table_name: relation, item_name });
      item_id = item.id;
    }

    book = await getSingleBookDB({ book_id });
    item = await getItemDB({ table_name: relation, item_id });

    if (book && item) {
      const {
        rows: [deleted_item],
      } = await client.query(query, [book_id, item_id]);

      return {
        status: "Success!",
        message: `${
          item_name ? item_name : item[`${relation}_name`]
        } no longer ${relation} for ${title ? title : book.title}`,
      };
    } else if (!book) {
      throw new NotFoundErrorDB(
        "The book you were searching for was not found"
      );
    } else if (!item) {
      throw new NotFoundErrorDB(
        `The ${relation} you were searching for was not found`
      );
    }
  } catch (error) {
    logErrorDB("deleteRelationDB", error);
    throw error;
  }
}

module.exports = deleteRelationDB;
