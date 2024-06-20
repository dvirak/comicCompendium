//! ----------------- IMPORTED LIBRARIES --------------------------
const { nextTick } = require("process");
const client = require("../../client");
const { logErrorDB } = require("../../../Errors/DB");
//! -----------------------------------------------------------

//* --------------CREATE BOOK IN DATABASE---------------
/**
 * Creates a new book record in the database.
 *
 * @param {Object} bookData - Object containing book data.
 * @param {string} bookData.title - The title of the book.
 * @param {string} bookData.publish_date - The publish date of the book.
 * @param {string} bookData.description - The description of the book.
 * @param {number} bookData.print_length - The print length of the book.
 * @param {number} bookData.series_volume - The series volume of the book.
 * @param {string} bookData.cover_image - The cover image of the book.
 * @returns {Promise<Object>} A promise that resolves to the created book data.
 * @throws {Error} If an error occurs during the database operation.
 *
 * @precondition bookData is an object containing the required book properties.
 * @postcondition The function returns a Promise that resolves to an object containing the created book data.
 *                If an error occurs, the function throws an error.
 */
async function createBookDB({
  title,
  publish_date,
  description,
  print_length,
  series_volume,
  cover_image,
}) {
  console.log("CREATING BOOK IN DB: " + title);

  try {
    // Insert a new book into the database
    const {
      rows: [book],
    } = await client.query(
      `
      INSERT INTO books(title, publish_date, description, print_length, series_volume, cover_image)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (title) DO NOTHING
      RETURNING *
      `,
      [
        title,
        publish_date,
        description,
        print_length,
        series_volume,
        cover_image,
      ]
    );

    console.log("CREATED BOOK: " + title);

    // Return the created book data
    return book;
  } catch (error) {
    // Log the error for further handling
    logErrorDB("createBookDB", error);
    throw error;
  }
}
//* --------------CREATE BOOK IN DATABASE---------------

// Export the function for use by other modules.
module.exports = createBookDB;
