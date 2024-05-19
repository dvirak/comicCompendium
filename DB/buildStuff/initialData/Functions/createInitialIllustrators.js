const { illustrators } = require("../Data/illustratorData");
const { createIllustrator } = require("../../../DBFunctions/illustratorDB");

async function createInitialIllustrators() {
  console.log("CREATING INITIAL Illustrators...");

  try {
    const createdIllustrators = await Promise.all(
      illustrators.map((illustrator) => createIllustrator(illustrator))
    );

    console.log("FINISHED CREATING INITIAL ILLUSTRATORS!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL ILLUSTRATORS: ` + error);
    throw error;
  }
}

module.exports = {
  createInitialIllustrators,
};
