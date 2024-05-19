const { colorists } = require("../Data/coloristData");
const { createColorist } = require("../../../DBFunctions/coloristDB");

async function createInitialColorists() {
  console.log("CREATING INITIAL Colorists...");

  try {
    const createdColorists = await Promise.all(
      colorists.map((colorist) => createColorist(colorist))
    );

    console.log("FINISHED CREATING INITIAL COLORISTS!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL COLORISTS: ` + error);
    throw error;
  }
}

module.exports = {
  createInitialColorists,
};
