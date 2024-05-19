const { createInitialAuthors } = require("./createInitialAuthors");
const { createInitialBooks } = require("./createInitialBooks");
const { createInitialUsers } = require("./createInitialUsers");
const { createInitialColorists } = require("./createInitialColorists");
const { createInitialIllustrators } = require("./createInitialIllustrators");
const { createInitialPublishers } = require("./createInitialPublishers");
const { createInitialSeries } = require("./createInitialSeries");
const { createInitialLetterers } = require("./createInitialLetterers");

async function createInitialData() {
  try {
    await createInitialUsers();
    await createInitialAuthors();
    await createInitialColorists();
    await createInitialIllustrators();
    await createInitialPublishers();
    await createInitialSeries();
    await createInitialLetterers();
    await createInitialBooks();
  } catch (error) {
    console.log("ERROR IN CREATE INITIAL DATA: " + error);
    throw error;
  }
}

module.exports = {
  createInitialData,
};
