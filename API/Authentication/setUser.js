// ! ----------------- IMPORTED LIBRARIES --------------------------
const jwt = require("jsonwebtoken");

// ! ---------------- IMPORTED MODULES -------------------------
const {
  getSingleUserDB,
} = require("../../DB/DBFunctions/UserDB/GetUsersDB/getSingleUserDB"); // Adjust the path as needed
const JWT_SECRET = process.env.JWT_SECRET;
// ! -----------------------------------------------------------

async function setUser(req, res, next) {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);
      const id = parsedToken && parsedToken.id;

      if (id) {
        req.user = await getSingleUserDB(id);
        next();
      } else {
        next({
          name: "AuthorizationHeaderError",
          message: "Authorization token malformed",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
}

module.exports = setUser;
