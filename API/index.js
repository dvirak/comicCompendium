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

// const { getUserById, getUserByUsername } = require("../db/usersDB");
// const { JWT_SECRET = "asugertiughfhsvduhsv" } = process.env;
// const client = require("../DB/client");

// Set req.user if possible
// apiRouter.use(async (req, res, next) => {
//   const prefix = "Bearer ";
//   const auth = req.header("Authorization");
//   console.log(req.header);
//   if (!auth) {
//     next();
//   } else if (auth.startsWith(prefix)) {
//     const token = auth.slice(prefix.length);
//     try {
//       const parsedToken = jwt.verify(token, JWT_SECRET);
//       console.log("After the verify");
//       console.log({ parsedToken });
//       console.log(parsedToken.id);
//       const id = parsedToken && parsedToken.id;

//       if (id) {
//         req.user = await getUserById(id);
//         next();
//       } else {
//         next({
//           name: "AuthorizationHeaderError",
//           message: "Authorization token malformed",
//         });
//       }
//     } catch ({ name, message }) {
//       next({ name, message });
//     }
//   } else {
//     next({
//       name: "AuthorizationHeaderError",
//       message: `Authorization token must start with ${prefix}`,
//     });
//   }
// });

// apiRouter.use((req, res, next) => {
//   if (req.user) {
//     console.log("User is set:", req.user);
//   }

//   next();
// });

// Will add these once I have the APIs written
// const usersRouter = require("./usersAPI");
// apiRouter.use("/users", usersRouter);

// const booksRouter = require("./bookController");
// apiRouter.use("/books", booksRouter);

// const cartsRouter = require("./cartsAPI");
// apiRouter.use("/cart", cartsRouter);

// const pastPurchasesRouter = require("./pastPurchasesAPI");
// apiRouter.use("/pastPurchases", pastPurchasesRouter);

// const wishlistsRouter = require("./wishlistAPI");
// apiRouter.use("/wishlist", wishlistsRouter);
