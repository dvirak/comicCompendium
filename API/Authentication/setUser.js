// ! ----------------- IMPORTED LIBRARIES --------------------------
const jwt = require("jsonwebtoken");

// ! ---------------- IMPORTED MODULES -------------------------
const {
  getSingleUserDB,
} = require("../../DB/DBFunctions/UserDB/GetUsersDB/getSingleUserDB"); // Adjust the path as needed
const {
  AuthorizationHeaderErrorAPI,
  TokenVerificationErrorAPI,
} = require("../../Errors/API");
const JWT_SECRET = process.env.JWT_SECRET;
// ! -----------------------------------------------------------

/**
 * Middleware function to set the user in the request object based on the JWT token.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
async function setUser(req, res, next) {
  // Define the prefix used for the Authorization header
  const prefix = "Bearer ";

  // Get the Authorization header from the request
  const auth = req.header("Authorization");

  // Check if the Authorization header is present
  if (!auth) {
    // If not present, move to the next middleware
    return next();
  }

  // Check if the Authorization header starts with the correct prefix
  if (!auth.startsWith(prefix)) {
    // If not formatted correctly, throw an AuthorizationHeaderErrorAPI
    return next(
      new AuthorizationHeaderErrorAPI(
        `Authorization token must start with ${prefix}`
      )
    );
  }

  // Extract the token from the Authorization header
  const token = auth.slice(prefix.length);

  try {
    // Verify the JWT token using the secret
    const parsedToken = jwt.verify(token, JWT_SECRET);
    const id = parsedToken && parsedToken.id;

    // Check if a valid user ID was extracted from the token
    if (!id) {
      // If token is malformed, throw an AuthorizationHeaderErrorAPI
      return next(
        new AuthorizationHeaderErrorAPI("Authorization token malformed")
      );
    }

    // Retrieve user data from the database based on the user ID
    req.user = await getSingleUserDB(id);

    // Check if user data was found in the database
    if (!req.user) {
      // If user not found, throw a TokenVerificationErrorAPI
      return next(
        new TokenVerificationErrorAPI("User not found for provided token")
      );
    }

    // If all checks pass, move to the next middleware
    next();
  } catch (error) {
    // Handle errors that occur during token verification
    console.error("Error during token verification: " + error);
    next(new TokenVerificationErrorAPI("Invalid token"));
  }
}

module.exports = setUser;

// // ! ----------------- IMPORTED LIBRARIES --------------------------
// const jwt = require("jsonwebtoken");

// // ! ---------------- IMPORTED MODULES -------------------------
// const {
//   getSingleUserDB,
// } = require("../../DB/DBFunctions/UserDB/GetUsersDB/getSingleUserDB"); // Adjust the path as needed
// const JWT_SECRET = process.env.JWT_SECRET;
// // ! -----------------------------------------------------------

// /**
//  * Middleware function to set the user in the request object based on the JWT token.
//  *
//  * @param {Object} req - The request object.
//  * @param {Object} res - The response object.
//  * @param {Function} next - The next middleware function.
//  */
// async function setUser(req, res, next) {
//   // Define the prefix used for the Authorization header
//   const prefix = "Bearer ";

//   // Get the Authorization header from the request
//   const auth = req.header("Authorization");

//   // Check if the Authorization header is present
//   if (!auth) {
//     // If not present, move to the next middleware
//     next();
//   } else if (auth.startsWith(prefix)) {
//     // If the header starts with the specified prefix
//     const token = auth.slice(prefix.length);
//     try {
//       // Verify the JWT token using the secret
//       const parsedToken = jwt.verify(token, JWT_SECRET);

//       // Extract the user ID from the parsed token
//       const id = parsedToken && parsedToken.id;

//       // If a valid user ID is present in the token
//       if (id) {
//         // Get the user data from the database using the user ID
//         req.user = await getSingleUserDB(id);

//         // Move to the next middleware
//         next();
//       } else {
//         // If the token is malformed, send an error response
//         next({
//           name: "AuthorizationHeaderError",
//           message: "Authorization token malformed",
//         });
//       }
//     } catch (error) {
//       // If an error occurs during token verification, send an error response
//     console.error("Error during token verification" + error);
//     next({
//       status: error.status || 500,
//       name: error.name,
//       message: error.message,
//     });
//     }
//   } else {
//     // If the Authorization header is not formatted correctly, send an error response
//     next({
//       name: "AuthorizationHeaderError",
//       message: `Authorization token must start with ${prefix}`,
//     });
//   }
// }

// module.exports = setUser;
