//! Imported Files --------------------------
const { userBooks } = require("../Data/userBooksData");
const { createUserBookDB } = require("../../../DBFunctions/UserBooksDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL USER BOOKS-------------
async function createInitialUserBooks() {
  console.log("CREATING INITIAL User Books...");

  try {
    // This method will guarantee proper order when seeding
    // for (const userBook of userBooks) {
    //   console.log(userBook); // You can customize this according to your data structure
    //   const newUserBook = await createUserBook(userBook);
    // }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    const createdUserBooks = await Promise.all(
      userBooks.map((userBook) => createUserBookDB(userBook))
    );

    console.log("FINISHED CREATING INITIAL USER BOOKS!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL USER BOOKS: ` + error);
    throw error;
  }
}
//* --------------CREATE INITIAL USER BOOKS-------------

module.exports = {
  createInitialUserBooks,
};
