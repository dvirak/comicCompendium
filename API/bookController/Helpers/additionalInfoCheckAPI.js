const getRelationItemsDB = require("../../../DB/DBFunctions/RelationFunctionsDB/getRelationItemsDB");
const { NotFoundErrorDB } = require("../../../Errors/DB");
const formatAdditionalInfo = require("./formatAdditionalInfo");

/**
 * Description: Checks and retrieves additional information related to a book,
 * such as its publisher, series, authors, illustrators, and genres.
 *
 * Input:
 * - `book_id` (string): The ID of the book for which additional information is requested.
 *
 * Output:
 * - Returns an object containing formatted additional information about the book,
 *   or an object indicating a NotFoundErrorDB if no information is available.
 *
 * Input Example:
 * - additionalInfoCheckAPI("12345");
 *
 * Output Example:
 * - On success:
 *   {
 *     publisher: 'Dark Horse',
 *     series: 'Avatar The Last Airbender Comics, Avatar The Last Airbender Books',
 *     author: 'Faith Erin Hicks',
 *     illustrator: 'Peter Wartman',
 *     colorist: 'Adele Matera',
 *     letterer: 'Richard Starkings, Jimmy Betancourt',
 *     genre: 'Graphic Novel, Fiction, Fantasy, Comic Book, Adventure'
 *   }
 * - On NotFoundErrorDB:
 *   {
 *     NotFoundErrorDB: "No additional information available"
 *   }
 *
 * @param {string} book_id - The ID of the book for which to check additional information.
 * @returns {Promise<Object>} - A promise that resolves to an object with the formatted additional information or an error message.
 */
async function additionalInfoCheckAPI(book_id) {
  console.log("In additionalInfoCheckAPI");
  const relations = [
    "publisher",
    "series",
    "author",
    "illustrator",
    "colorist",
    "inker",
    "letterer",
    "penciller",
    "genre",
  ];

  let formattedInfo;

  try {
    const additionalInfo = await getRelationItemsDB({
      main_item: "book",
      main_item_id: book_id,
      relations,
    });

    formattedInfo = formatAdditionalInfo(additionalInfo);
    return formattedInfo;
  } catch (error) {
    if (error instanceof NotFoundErrorDB) {
      formattedInfo = {
        NotFoundErrorDB: "No additional information available",
      };
      return formattedInfo;
    } else {
      throw error;
    }
  }
}

module.exports = additionalInfoCheckAPI;
