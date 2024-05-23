const { createInitialAuthors } = require("./createInitialAuthors");
const { createInitialBooks } = require("./createInitialBooks");
const { createInitialUsers } = require("./createInitialUsers");
const { createInitialColorists } = require("./createInitialColorists");
const { createInitialIllustrators } = require("./createInitialIllustrators");
const { createInitialPublishers } = require("./createInitialPublishers");
const { createInitialSeries } = require("./createInitialSeries");
const { createInitialLetterers } = require("./createInitialLetterers");
const { createInitialBookAuthors } = require("./createInitialBookAuthors");
const { createInitialBookColorists } = require("./createInitialBookColorists");
const { createInitialInkers } = require("./createInitialInkers");
const { createInitialPencillers } = require("./createInitialPencillers");
const {
  createInitialBookIllustrators,
} = require("./createInitialBookIllustrators");
const {
  createInitialBookPencillers,
} = require("./createInitialBookPencillers");
const { createInitialBookInkers } = require("./createInitialBookInkers");
const { createInitialBookSeries } = require("./createInitialBookSeries");
const { createInitialBookLetterers } = require("./createInitialBookLetterers");
const { createInitialBookGenres } = require("./createInitialBookGenres");

async function createInitialData() {
  try {
    await createInitialUsers();
    await createInitialAuthors();
    await createInitialColorists();
    await createInitialIllustrators();
    // await createInitialInkers();
    // await createInitialPencillers();
    await createInitialPublishers();
    await createInitialSeries();
    await createInitialLetterers();
    await createInitialBooks();
    await createInitialBookAuthors();
    await createInitialBookColorists();
    await createInitialBookIllustrators();
    await createInitialBookSeries();
    await createInitialBookLetterers();
    // await createInitialBookPencillers();
    // await createInitialBookInkers();
    await createInitialBookGenres();
  } catch (error) {
    console.log("ERROR IN CREATE INITIAL DATA: " + error);
    throw error;
  }
}

module.exports = {
  createInitialData,
};
