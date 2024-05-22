//! Imported Files --------------------------
const { bookPencillers } = require("../Data/bookPencillerData");
const {
  createBookPenciller,
} = require("../../../DBFunctions/BookPencillerDB/createBookPencillerDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL BOOK PENCILLERS-------------
async function createInitialBookPencillers() {
  console.log("CREATING INITIAL BookPencillers...");

  try {
    // This method will guarantee proper order when seeding
    for (const bookPenciller of bookPencillers) {
      const newBookPenciller = await createBookPenciller(bookPenciller);
    }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    // const createdBookPenciller = await Promise.all(
    //   bookPencillers.map((bookPenciller) => createBookPenciller(bookPenciller))
    // );

    console.log("FINISHED CREATING INITIAL BookPencillers!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL BookPencillers: ` + error);
    throw error;
  }
}
//* --------------CREATE INITIAL BOOK PENCILLERS-------------

module.exports = {
  createInitialBookPencillers,
};
