//! Imported Files --------------------------
const { bookPublishers } = require("../Data/bookPublisherData");
const {
  createBookPublisherDB,
} = require("../../../DBFunctions/BookPublisherDB/createBookPublisherDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL BOOK PUBLISHERS-------------
async function createInitialBookPublishers() {
  console.log("CREATING INITIAL BookPublishers...");

  try {
    // This method will guarantee proper order when seeding
    for (const bookPublisher of bookPublishers) {
      const newBookPublisher = await createBookPublisherDB(bookPublisher);
    }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    // const createdBookPublishers = await Promise.all(
    //   bookPublishers.map((bookPublisher) => createBookPublisher(bookPublisher))
    // );

    console.log("FINISHED CREATING INITIAL BookPublishers!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL BookPublishers: ` + error);
    throw error;
  }
}
//* --------------CREATE INITIAL BOOK PUBLISHERS-------------

module.exports = {
  createInitialBookPublishers,
};
