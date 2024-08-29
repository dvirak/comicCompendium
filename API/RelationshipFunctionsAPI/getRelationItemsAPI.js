const {
  getRelationItemsDB,
} = require("../../DB/DBFunctions/RelationFunctionsDB");
const {
  logErrorAPI,
  MissingInformationErrorAPI,
  NotFoundErrorAPI,
} = require("../../Errors/API");

async function getRelationItemsAPI(req, res, next, table_name) {
  console.log("IN GETRELATIONSITEMSAPI....");
  console.log(req.params);
  console.log(req.query);

  let main_item = table_name;
  let main_item_id = req.params.id;
  let relations = Object.keys(req.query);

  console.log("main_item: " + main_item);
  console.log("main_item_id: " + main_item_id);
  console.log("relations: ");
  console.log(relations);
  try {
    if (!main_item || !main_item_id || !relations) {
      throw new MissingInformationErrorAPI(
        `You are missing the necessary information to retrieve relations: ${relations.join()} for item number: ${main_item_id} in the table: ${main_item}`
      );
    }

    const info = await getRelationItemsDB({
      main_item,
      main_item_id,
      relations,
    });

    if (!info) {
      throw new NotFoundErrorAPI(
        `No information was found for relations: ${relations.join()} for item number: ${main_item_id} in the table: ${main_item}`
      );
    }

    res.status(200).json(info);
  } catch (error) {
    logErrorAPI("getRelationItemsAPI", error, next);
    throw error;
  }
}

module.exports = getRelationItemsAPI;
