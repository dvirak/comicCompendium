//! Imported Files --------------------------
const { genres } = require("../Data/genreData");
const { createGenre } = require("../../../DBFunctions/GenreDB/createGenreDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL GENRES-------------
async function createInitialGenres() {
  console.log("CREATING INITIAL Genres...");

  try {
    // This method will guarantee proper order when seeding
    // Use for seeding purpose to ensure order of data without creating seed specific functions
    for (const genre of genres) {
      const newGenre = await createGenre(genre);
    }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    // const createdGenres = await Promise.all(
    //   genres.map((genre) => createGenre(genre))
    // );

    console.log("FINISHED CREATING INITIAL GENRES!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL GENRES: ` + error);
    throw error;
  }
}
//* --------------CREATE INITIAL GENRES-------------

module.exports = {
  createInitialGenres,
};
