const { logErrorDB, MissingInformationErrorDB } = require("../../../Errors/DB");
const client = require("../../client");
const getSingleBookDB = require("../BookDB/GetBooksDB/getSingleBookDB");
const { getItemDB } = require("../MainFunctionsDB");

async function deleteRelationDB(book_id, item_id, relation, title, item_name) {
  const query = `DELETE 
  FROM book_${relation === "series" ? "serie" : relation}s
  WHERE book_id = $1 AND ${relation}_id = $2`;

  try {
    if (!book_id && !title) {
      throw new MissingInformationErrorDB(
        "Please provide the book information to deleteReleationDB"
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
      let book = await getSingleBookDB({ title });
      book_id = book.id;
    }

    if (!item_id) {
      let item = await getItemDB({ table_name: relation, item_name });
      item_id = item.id;
    }

    const {
      rows: [deleted_item],
    } = await client.query(query, [book_id, item_id]);

    return deleted_item;
  } catch (error) {
    logErrorDB("deleteRelationDB", error);
    throw error;
  }
}

module.exports = deleteRelationDB;
