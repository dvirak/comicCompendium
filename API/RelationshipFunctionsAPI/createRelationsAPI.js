const createAdditionalInfoDB = require("../../DB/DBFunctions/BookDB/helpers/createAdditionalInfoDB");
const { logErrorAPI, MissingInformationErrorAPI } = require("../../Errors/API");
const { formatAdditionalInfo } = require("../bookController/Helpers");

async function createRelationsAPI(req, res, next) {
  console.log("IN createRelationsAPI");
  let relations = req.body;
  let book_id = req.params.book_id;

  try {
    if (!relations || !book_id) {
      throw new MissingInformationErrorAPI(
        "You are missing information needed for this create query. Please double check the information provided"
      );
    }

    let updatedRelation = await createAdditionalInfoDB(book_id, relations);

    let formattedRelation = formatAdditionalInfo(updatedRelation);

    res.status(200).json(formattedRelation);
  } catch (error) {
    logErrorAPI("createRelationsAPI", error, next);
    throw error;
  }
}

module.exports = createRelationsAPI;
