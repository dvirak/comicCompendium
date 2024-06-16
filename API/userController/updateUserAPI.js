const {
  getUserByIdDB,
} = require("../../DB/DBFunctions/UserDB/GetUsersDB/Helpers");
const { logError, UserNotFoundErrorAPI } = require("../../Errors/API");

async function updateUserAPI(req, res, next) {
  const userToEdit = await getUserByIdDB(req.body.user_id);
  if (!userToEdit) {
    throw new UserNotFoundErrorAPI();
  }

  try {
  } catch (error) {
    logError("updateUserAPI", error, next);
  }
}

module.exports = updateUserAPI;
