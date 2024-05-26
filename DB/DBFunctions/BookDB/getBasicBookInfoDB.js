//! Imported Libraries --------------------------
// const { nextTick } = require("process");
const client = require("../../client");
// const { requireUser } = require('/utils');
//! ---------------------------------------------

// -----------------GET BASIC BOOK INFO DB-----------------
async function getBasicBookInfoDB() {
  console.log("IN GET BASIC BOOK INFO");
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM books;
    `);
    // const books = JSON.stringify(rows);
    return rows;
  } catch (err) {
    console.log(`Error occurred in GET BASIC BOOK INFO: ${err}`);
    throw err;
  }
}
// -----------------GET BASIC BOOK INFO DB-----------------

module.exports = { getBasicBookInfoDB };
