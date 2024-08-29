const { NotFoundErrorDB, logErrorDB } = require("../../../Errors/DB");
const client = require("../../client");

async function getRelationItemsDB({ main_item, main_item_id, relations }) {
  console.log(relations);
  console.log(
    `Getting relationship between ${main_item} and ${relations.join(
      ", "
    )} for ${main_item}_id: ${main_item_id}`
  );

  const queries = relations.map(
    (relation) => `
  SELECT '${relation}' as relation_type, ${relation}s.id as relation_id, ${relation}s.${relation}_name as relation_name
  FROM ${relation}s
  JOIN ${main_item}_${relation}s ON ${main_item}_${relation}s.${relation}_id = ${relation}s.id
  WHERE ${main_item}_${relation}s.${main_item}_id = $1
  `
  );

  const query = queries.join(` UNION ALL `);

  try {
    console.log("IN TRY BLOCK");
    console.log(query);

    const { rows } = await client.query(query, [main_item_id]);
    console.log("THIS IS AFTER THE QUERY");
    if (rows.length === 0) {
      throw new NotFoundErrorDB(
        `No relations were found for the ${main_item} where ID = ${main_item_id}`
      );
    }

    console.log(`We made it here`);

    console.log(rows[0]);
    return rows;
  } catch (error) {
    logErrorDB("getRelationItems", error);
    throw error;
  }
}

// async function test() {
//   let main_item = "book";
//   let main_item_id = 5;
//   let relations = ["author", "genre", "illustrator"];

//   let testResults = await getRelationItems({
//     main_item,
//     main_item_id,
//     relations,
//   });
//   console.log(testResults);
// }

// test();

module.exports = getRelationItemsDB;
