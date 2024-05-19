const { letterers } = require("../Data/lettererData");
const { createLetterer } = require("../../../DBFunctions/lettererDB");

async function createInitialLetterers() {
  console.log("CREATING INITIAL Letterers...");

  try {
    const createdLetterers = await Promise.all(
      letterers.map((letterer) => createLetterer(letterer))
    );

    console.log("FINISHED CREATING INITIAL LETTERERS!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL LETTERERS: ` + error);
    throw error;
  }
}

module.exports = {
  createInitialLetterers,
};
