//! Imported Files --------------------------
const { publishers } = require("../Data/publisherData");
const { createPublisher } = require("../../../DBFunctions/publisherDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL PUBLISHERS-------------
async function createInitialPublishers() {
  console.log("CREATING INITIAL Publishers...");

  try {
    // This method will guarantee proper order when seeding
    // for (const publisher of publishers) {
    //   console.log(publisher); // You can customize this according to your data structure
    //   const newPublisher = await createPublisher(publisher);
    // }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    const createdPublishers = await Promise.all(
      publishers.map((publisher) => createPublisher(publisher))
    );

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
