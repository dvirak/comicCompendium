const getRelationItemsDB = require("../../../DB/DBFunctions/RelationFunctionsDB/getRelationItemsDB");
const { NotFoundErrorDB } = require("../../../Errors/DB");
const formatAdditionalInfo = require("./formatAdditionalInfo");

async function additionalInfoCheckAPI(book_id) {
  console.log("In additionalInfoCheckAPI");
  const relations = [
    "publisher",
    "series",
    "author",
    "illustrator",
    "colorist",
    "inker",
    "letterer",
    "penciller",
    "genre",
  ];

  let formattedInfo;

  try {
    const additionalInfo = await getRelationItemsDB({
      main_item: "book",
      main_item_id: book_id,
      relations,
    });

    formattedInfo = formatAdditionalInfo(additionalInfo);
    return formattedInfo;
  } catch (error) {
    if (error instanceof NotFoundErrorDB) {
      formattedInfo = {
        NotFoundErrorDB: "No additional information available",
      };
      return formattedInfo;
    } else {
      throw error;
    }
  }
}

module.exports = additionalInfoCheckAPI;
