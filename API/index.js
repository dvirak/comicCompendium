// ! ----------------- IMPORTED LIBRARIES --------------------------
const express = require("express");
// ! -----------------------------------------------------------

// ! ---------------- IMPORTED MODULES -------------------------
const setUser = require("./Authentication/setUser");
const { errorHandlerAPI } = require("../Errors/API/");
// ! -----------------------------------------------------------

// Create an Express router instance
const apiRouter = express.Router();

/**
 * Middleware: setUser
 *
 * This middleware is used to set user information for each request. It is applied to all routes
 * defined in this router, ensuring that user-related data is available for route handlers.
 */
apiRouter.use(setUser);

// Import controllers for different resources
const bookController = require("./bookController");
const userController = require("./userController");
const authorController = require("./authorController");
const illustratorController = require("./illustratorController");
const genresController = require("./genreController");
const coloristsRouter = require("./coloristController");
const inkersRouter = require("./inkerController");
const letterersRouter = require("./lettererController");
const pencillersRouter = require("./pencillerContoller");
const publishersRouter = require("./publisherController");
const seriesRouter = require("./seriesController");

// Define routes for each resource using the imported controllers
apiRouter.use("/books", bookController);
apiRouter.use("/users", userController);
apiRouter.use("/authors", authorController);
apiRouter.use("/illustrators", illustratorController);
apiRouter.use("/genres", genresController);
apiRouter.use("/colorists", coloristsRouter);
apiRouter.use("/inkers", inkersRouter);
apiRouter.use("/letterers", letterersRouter);
apiRouter.use("/pencillers", pencillersRouter);
apiRouter.use("/publishers", publishersRouter);
apiRouter.use("/series", seriesRouter);

/**
 * Error Handling Middleware: errorHandlerAPI
 *
 * This middleware handles errors that occur during the request-response cycle. It is placed at the
 * end of the router to catch and process any errors that were not handled by preceding middleware
 * or route handlers.
 */
apiRouter.use(errorHandlerAPI);

module.exports = apiRouter;
