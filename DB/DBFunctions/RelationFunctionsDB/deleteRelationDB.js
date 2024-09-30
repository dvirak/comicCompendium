const {
  logErrorDB,
  MissingInformationErrorDB,
  NotFoundErrorDB,
} = require("../../../Errors/DB");
const client = require("../../client");
const getSingleBookDB = require("../BookDB/GetBooksDB/getSingleBookDB");
const { getItemDB } = require("../MainFunctionsDB");

async function deleteRelationDB(book_id, item_id, relation, title, item_name) {
  console.log("In deleteRelationDB");
  console.log("item_id = " + item_id);
  console.log("book_id = " + book_id);
  let book;
  let item;
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

    book = book_id
      ? await getSingleBookDB({ book_id })
      : await getSingleBookDB({ title });

    item = item_id
      ? await getItemDB({ item_id })
      : await getItemDB({ table_name: relation, item_name });

    if (!book) {
      throw new NotFoundErrorDB(
        "The book you were searching for was not found"
      );
    } else if (!item) {
      throw new NotFoundErrorDB(
        `The ${relation} you were searching for was not found`
      );
    } else {
      book_id = book.id;
      item_id = item.id;
    }

    console.log(item);
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
    }
  } catch (error) {
    logErrorDB("deleteRelationDB", error);
    throw error;
  }
}

module.exports = deleteRelationDB;
