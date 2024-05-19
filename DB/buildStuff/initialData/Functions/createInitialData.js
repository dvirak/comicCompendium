const { createInitialBooks } = require("./createInitialBooks");
const { createInitialUsers } = require("./createInitialUsers");

async function createInitialData() {
  try {
    await createInitialUsers();
    await createInitialBooks();
  } catch (error) {
    console.log("ERROR IN CREATE INITIAL DATA: " + error);
    throw error;
  }
}

module.exports = {
  createInitialData,
};
