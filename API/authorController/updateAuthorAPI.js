// ! ----------------- IMPORTED FILES --------------------------
const express = require("express");
const router = express.Router();
// ! -----------------------------------------------------------

// ! ---------------- IMPORTED MODULES -------------------------
const { getAuthorByIdDB } = require("../../DB/DBFunctions/AuthorDB/Helpers");
const { updateAuthorDB } = require("../../DB/DBFunctions/AuthorDB/");
const { logErrorAPI, NotFoundErrorAPI } = require("../../Errors/API");
const { createAuthorUpdateFieldsAPI } = require("./Helpers");
// ! -----------------------------------------------------------

/**
 * Description: Updates author information based on author_id and request body data.
 * Method: PATCH
 * Route: /authors/:author_id/update
 *
 * @param {Object} req - Express request object containing author_id in params and update data in body.
 * @param {Object} res - Express response object to send success message and updated author data.
 * @param {Function} next - Express next function to pass control to the next middleware.
 * @returns {Promise<void>} This route does not return anything directly, but it sends a response with a success message and updated author data.
 * @throws {NotFoundErrorAPI} If the author with the specified author_id is not found in the database.
 * @throws {Error} If an error occurs while updating author information in the database.
 *
 * @precondition The user must be authenticated and authorized to update author information.
 * @postcondition Author information is updated in the database and a success message with updated author data is sent to the client.
 */
async function updateAuthorAPI(req, res, next) {
  const author_id = Number(req.params.author_id);
  const updateData = req.body;

  try {
    // Retrieve author information to edit from the database
    const authorToEdit = await getAuthorByIdDB(author_id);

    // Check if author exists
    if (!authorToEdit) {
      throw new NotFoundErrorAPI(
        "The author you are trying to update was not found"
      );
    } else {
      // Create update fields based on current author and update data
      const updateFields = await createAuthorUpdateFieldsAPI(
        authorToEdit,
        updateData
      );

      // Update author information in the database
      let updatedAuthor = await updateAuthorDB(author_id, updateFields);

      // Send success message and updated author data as response
      res.send({ message: "Update successful!", updatedAuthor });
    }
  } catch (error) {
    // Handle errors and send an appropriate response
    logErrorAPI("updateAuthorAPI", error, next);
  }
}

module.exports = updateAuthorAPI;
