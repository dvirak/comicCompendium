const { formatAdditionalInfo } = require("../../../API/bookController/Helpers");
const { logErrorDB } = require("../../../Errors/DB");
const checkOrCreateItemDB = require("../MainFunctionsDB/checkOrCreateItemDB");
const { createRelationsDB } = require("../RelationFunctionsDB");
const { checkOrCreateBookDB } = require("./helpers");

async function processBookInfoDB(bookInfo) {
  console.log("IN PROCESS BOOK INFO DB");
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

    let book = await checkOrCreateBookDB(
      title,
      publish_date,
      description,
      print_length,
      series_volume,
      cover_image
    );

    let book_id = book.id;

    let additionalInfo = [];

    for (const [relationType, relationValue] of Object.entries(relations)) {
      if (relationValue) {
        let items = relationValue.split(", ").map((item) => item.trim());

        for (const item of items) {
          let itemInfo = await checkOrCreateItemDB(
            (table_name = relationType),
            (item_name = item)
          );
          let relation_id = itemInfo.id;
          let createRelation = await createRelationsDB(
            book_id,
            relationType,
            relation_id
          );
          if (createRelation)
            additionalInfo.push({
              relation_type: relationType,
              relation_name: item,
            });
        }
      }
    }

    let formattedInfo = formatAdditionalInfo(additionalInfo);

    let updatedBookInfo = { ...book, ...formattedInfo };
    return updatedBookInfo;
  } catch (error) {
    logErrorDB("processBookInfoDB", error);
    throw error;
  }
}

module.exports = processBookInfoDB;
