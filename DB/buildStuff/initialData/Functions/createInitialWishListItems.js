//! Imported Files --------------------------
const { wishlistItems } = require("../Data/wishlistItemData");
const { createWishlistItemDB } = require("../../../DBFunctions/WishlistItemDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL WISHLIST ITEMS-------------
async function createInitialWishlistItems() {
  console.log("CREATING INITIAL Wishlist Items...");

  try {
    // This method will guarantee proper order when seeding
    // for (const item of wishlistItems) {
    //   console.log(item); // You can customize this according to your data structure
    //   const newItem = await createWishlistItem(item);
    // }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    const createdItems = await Promise.all(
      wishlistItems.map((item) => createWishlistItemDB(item))
    );

    console.log("FINISHED CREATING INITIAL WISHLIST ITEMS!");
  } catch (error) {
    console.error(`ERROR CREATING INITIAL WISHLIST ITEMS: ${error}`);
    throw error;
  }
}
//* --------------CREATE INITIAL WISHLIST ITEMS-------------

module.exports = {
  createInitialWishlistItems,
};
