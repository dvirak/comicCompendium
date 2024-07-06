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

// Define routes
apiRouter.use("/books", bookController);
apiRouter.use("/users", userController);

// Error handling middleware
apiRouter.use(errorHandlerAPI);

module.exports = apiRouter;
