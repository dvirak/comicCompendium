const client = require("./client");
const { rebuildDB, testDB } = require("./buildStuff/buildDatabase/rebuildDB");

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
