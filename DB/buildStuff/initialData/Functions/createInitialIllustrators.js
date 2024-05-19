//! Imported Files --------------------------
const { illustrators } = require("../Data/illustratorData");
const { createIllustrator } = require("../../../DBFunctions/illustratorDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL ILLUSTRATORS-------------
async function createInitialIllustrators() {
  console.log("CREATING INITIAL Illustrators...");

  try {
    // This method will guarantee proper order when seeding
    // for (const illustrator of illustrators) {
    //   console.log(illustrator); // You can customize this according to your data structure
    //   const newIllustrator = await createIllustrator(illustrator);
    // }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    const createdIllustrators = await Promise.all(
      illustrators.map((illustrator) => createIllustrator(illustrator))
    );

    console.log("FINISHED CREATING INITIAL ILLUSTRATORS!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL ILLUSTRATORS: ` + error);
    throw error;
  }
}
//* --------------CREATE INITIAL ILLUSTRATORS-------------

module.exports = {
  createInitialIllustrators,
};
