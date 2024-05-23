//! Imported Files --------------------------
const { publishers } = require("../Data/publisherData");
const {
  createPublisherDB,
} = require("../../../DBFunctions/PublisherDB/createPublisherDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL PUBLISHERS-------------
async function createInitialPublishers() {
  console.log("CREATING INITIAL Publishers...");

  try {
    // This method will guarantee proper order when seeding
    for (const publisher of publishers) {
      const newPublisher = await createPublisherDB(publisher);
    }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    // const createdPublishers = await Promise.all(
    //   publishers.map((publisher) => createPublisher(publisher))
    // );

    console.log("FINISHED CREATING INITIAL PUBLISHERS!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL PUBLISHERS: ` + error);
    throw error;
  }
}
//* --------------CREATE INITIAL PUBLISHERS-------------

module.exports = {
  createInitialPublishers,
};
