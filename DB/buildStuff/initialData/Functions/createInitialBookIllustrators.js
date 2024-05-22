//! Imported Files --------------------------
const { bookIllustrators } = require("../Data/bookIllustratorData");
const {
  createBookIllustrator,
} = require("../../../DBFunctions/BookIllustratorDB/createBookIllustratorDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL BOOK ILLUSTRATORS-------------
async function createInitialBookIllustrators() {
  console.log("CREATING INITIAL BookIllustrators...");

  try {
    // This method will guarantee proper order when seeding
    for (const bookIllustrator of bookIllustrators) {
      const newBookIllustrator = await createBookIllustrator(bookIllustrator);
    }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    // const createdBookIllustrator = await Promise.all(
    //   bookIllustrators.map((bookIllustrator) => createBookIllustrator(bookIllustrator))
    // );

    console.log("FINISHED CREATING INITIAL BookIllustrators!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL BookIllustrators: ` + error);
    throw error;
  }
}
//* --------------CREATE INITIAL BOOK ILLUSTRATORS-------------

module.exports = {
  createInitialBookIllustrators,
};
