const checkOrCreateItemDB = require("../../MainFunctionsDB/checkOrCreateItemDB");
const { createRelationsDB } = require("../../RelationFunctionsDB");

async function createAdditionalInfoDB(book_id, relations) {
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

  return additionalInfo;
}

module.exports = createAdditionalInfoDB;
