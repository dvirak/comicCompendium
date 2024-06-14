const {
  getUserByIdDB,
} = require("../../DB/DBFunctions/UserDB/GetUsersDB/Helpers");
const { UserNotFoundErrorAPI } = require("../ErrorsAPI/APIErrorsFolder");

async function updateUserAPI(req, res, next) {
  const userToEdit = await getUserByIdDB(req.body.user_id);
  if (!userToEdit) {
    throw new UserNotFoundErrorAPI();
  }

  try {
  } catch (error) {
    next({
      status: 500,
      name: error.name,
      message: error.message,
    });
  }
}
