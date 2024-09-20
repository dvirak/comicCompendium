const {
  deleteRelationDB,
} = require("../../DB/DBFunctions/RelationFunctionsDB");
const { logErrorAPI } = require("../../Errors/API");

async function deleteRelationAPI(req, res, next) {
  const book_id = req.params.book_id;
  const item_id = req.params.item_id;
  const relation = req.params.relation;
  const { title, item_name } = req.query;
  console.log("IN deleteRelationAPI");
  console.log(req.query);

  try {
    const deletedItem = await deleteRelationDB(
      book_id,
      item_id,
      relation,
      title,
      item_name
    );

    res.status(200).json(deletedItem);
  } catch (error) {
    logErrorAPI("deleteRelationAPI", error, next);
    throw error;
  }
}

module.exports = deleteRelationAPI;
