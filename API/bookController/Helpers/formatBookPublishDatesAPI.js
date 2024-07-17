// ! ---------------- IMPORTED FILES -------------------------
const { format } = require("date-fns");
// ! -----------------------------------------------------------

/**
 * Description: Formats the publish date of books. If a single book object is provided, it returns the formatted book object. If an array of books is provided, it returns an array of formatted book objects.
 *
 * @param {Object|Array} books - A single book object or an array of book objects to be formatted.
 * @returns {Object|Array} A single formatted book object or an array of formatted book objects.
 *
 * @precondition `books` should be a valid book object or an array of book objects with a `publish_date` field.
 * @postcondition Returns the book(s) with the `publish_date` field formatted to "MMMM do, yyyy".
 */

function formatBookPublishDatesAPI(books) {
  // Check if the input is not an array, if so, convert it to an array
  if (!Array.isArray(books)) {
    books = [books];
  }

  // Format the publish_date for each book in the array
  const formattedBooks = books.map((book) => {
    return {
      ...book,
      publish_date: format(new Date(book.publish_date), "MMMM do, yyyy"),
    };
  });

  // If the input was a single book object, return the first (and only) formatted book object
  return formattedBooks.length === 1 ? formattedBooks[0] : formattedBooks;
}

module.exports = formatBookPublishDatesAPI;
