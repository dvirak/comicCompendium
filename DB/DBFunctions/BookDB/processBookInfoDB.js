const { logErrorDB } = require("../../../Errors/DB");
const checkOrCreateItemDB = require("../MainFunctionsDB/checkOrCreateItemDB");
const { createRelationsDB } = require("../RelationFunctionsDB");
const { checkOrCreateBookDB } = require("./helpers");

async function processBookInfoDB(bookInfo) {
  try {
    const {
      title,
      publish_date,
      description,
      print_length,
      series_volume,
      cover_image,
      ...relations
    } = bookInfo;

    let book_id = checkOrCreateBookDB(
      title,
      publish_date,
      description,
      print_length,
      series_volume,
      cover_image
    );

    for (const [relationType, relationValue] of Object.entries(relations)) {
      if (relationValue) {
        let items = relationValue.split(", ").map((item) => item.trim());

        for (const item of items) {
          let relation_id = await checkOrCreateItemDB(relationType, item);
          await createRelationsDB(book_id, relationType, relation_id);
        }
      }
    }
  } catch (error) {
    logErrorDB("processBookInfoDB", error);
    throw error;
  }
}

module.exports = processBookInfoDB;
