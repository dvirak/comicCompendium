const { logErrorDB } = require("../../../../Errors/DB");
const checkOrCreateItemDB = require("../../MainFunctionsDB/checkOrCreateItemDB");
const { createRelationsDB } = require("../../RelationFunctionsDB");

/**
 * Description: Creates additional information relations for a specific book based on the provided relations.
 *
 * @param {string} book_id - The ID of the book for which additional info is being created (optional).
 * @param {Object} relations - An object containing relation types and their corresponding values.
 * - `publisher` (string): The publisher of the book (relation data/optional).
 * - `series` (string): The series name (relation data/optional).
 * - `author` (string): The author of the book (relation data/optional).
 * - `illustrator` (string): The illustrators of the book (relation data/optional).
 * - `colorist` (string): The colorists involved (relation data/optional).
 * - `letterer` (string): The letterers involved (relation data/optional).
 * - `genre` (string): The genre(s) of the book (relation data/optional).
 * - `penciller` (string): The penciller of the book (relation data/optional).
 *
 * @returns {Promise<Object[]>} An array of objects representing the created additional info.
 * Each object includes:
 * - `relation_type` (string): The type of the relation added.
 * - `relation_name` (string): The name of the relation.
 *
 * @throws {Error} If there is an error during the creation of additional info.
 *
 * @precondition None
 * @postcondition Additional info relations are created in the database.
 */
async function createAdditionalInfoDB(book_id, relations) {
  console.log("IN CREATE ADDITIONAL INFO DB");
  let additionalInfo = [];

  try {
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
  } catch (error) {
    logErrorDB("createAdditionalInfoDB", error);
    throw error;
  }
}

module.exports = createAdditionalInfoDB;
