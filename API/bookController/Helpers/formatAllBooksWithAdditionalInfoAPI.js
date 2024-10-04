const { logErrorAPI } = require("../../../Errors/API");
const additionalInfoCheckAPI = require("./additionalInfoCheckAPI");

async function formatAllBooksWithAdditionalInfoAPI(books) {
  let fullyInformedBooks = [];
  try {
    for (const book of books) {
      let additionalInfo = await additionalInfoCheckAPI(book.id);
      fullyInformedBooks.push({ ...book, ...additionalInfo });
    }
    return fullyInformedBooks;
  } catch (error) {
    logErrorAPI("formatAllBooksWithAdditionalInfoAPI", error, next);
    throw error;
  }
}

module.exports = formatAllBooksWithAdditionalInfoAPI;
