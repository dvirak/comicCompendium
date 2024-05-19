const { publishers } = require("../Data/publisherData");
const { createPublisher } = require("../../../DBFunctions/publisherDB");

async function createInitialPublishers() {
  console.log("CREATING INITIAL Publishers...");

  try {
    const createdPublishers = await Promise.all(
      publishers.map((publisher) => createPublisher(publisher))
    );

    console.log("FINISHED CREATING INITIAL PUBLISHERS!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL PUBLISHERS: ` + error);
    throw error;
  }
}

module.exports = {
  createInitialPublishers,
};
