//! Imported Files --------------------------
const { bookGenres } = require("../Data/bookGenreData");
const {
  createBookGenre,
} = require("../../../DBFunctions/BookGenreDB/createBookGenreDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL BOOK GENRES-------------
async function createInitialBookGenres() {
  console.log("CREATING INITIAL BookGenres...");

  try {
    // This method will guarantee proper order when seeding
    for (const bookGenre of bookGenres) {
      const newBookGenre = await createBookGenre(bookGenre);
    }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    // const createdBookGenres = await Promise.all(
    //   bookGenres.map((bookGenre) => createBookGenre(bookGenre))
    // );

    console.log("FINISHED CREATING INITIAL BookGenres!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL BookGenres: ` + error);
    throw error;
  }
}
//* --------------CREATE INITIAL BOOK GENRES-------------

module.exports = {
  createInitialBookGenres,
};
