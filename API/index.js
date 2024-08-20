// ! ----------------- IMPORTED LIBRARIES --------------------------
const express = require("express");
// ! -----------------------------------------------------------

// ! ---------------- IMPORTED MODULES -------------------------
const setUser = require("./Authentication/setUser");
const { errorHandlerAPI } = require("../Errors/API/");
// ! -----------------------------------------------------------

const apiRouter = express.Router();

// Use the setUser middleware
apiRouter.use(setUser);

// Import controllers for books and users
const bookController = require("./bookController");
const userController = require("./userController");
const authorController = require("./authorController");
const illustratorController = require("./illustratorController");
const genresController = require("./genresController");

// Define routes
apiRouter.use("/books", bookController);
apiRouter.use("/users", userController);
apiRouter.use("/authors", authorController);
apiRouter.use("/illustrators", illustratorController);
apiRouter.use("/genres", genresController);

// Error handling middleware
apiRouter.use(errorHandlerAPI);

module.exports = apiRouter;
