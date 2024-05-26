//! Imported Libraries --------------------------
import { expect } from "chai";
//! ---------------------------------------------

//! Imported Files ------------------------------
import { getBasicBookInfoDB } from "../DB/DBFunctions/BookDB/getBasicBookInfoDB.js";
//! ---------------------------------------------

describe("Get Basic Book Info DB Function", function () {
  this.timeout(30000);

  it("should get all basic book information", async function () {
    console.log("TESTING BOOK FUNCTIONS");
    try {
      const books = await getBasicBookInfoDB();
      expect(books).to.be.an("array");
    } catch (error) {
      console.log("Test for getBasicBookInfoDB Failed: " + error);
      throw error;
    }
  });
});
