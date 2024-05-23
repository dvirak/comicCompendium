//! Imported Files --------------------------
const { wishlists } = require("../Data/wishlistData");
const { createWishlistDB } = require("../../../DBFunctions/WishlistDB");
//! ---------------------------------------------

//* --------------CREATE INITIAL WISHLISTS-------------
async function createInitialWishlists() {
  console.log("CREATING INITIAL Wishlists...");

  try {
    // This method will guarantee proper order when seeding
    // for (const wishlist of wishlists) {
    //   console.log(wishlist); // You can customize this according to your data structure
    //   const newWishlist = await createWishlist(wishlist);
    // }

    // A slightly faster way to seed which will not guarantee order unless id is specified.
    const createdWishlists = await Promise.all(
      wishlists.map((wishlist) => createWishlistDB(wishlist))
    );

    console.log("FINISHED CREATING INITIAL WISHLISTS!");
  } catch (error) {
    console.log(`ERROR CREATING INITIAL WISHLISTS: ` + error);
    throw error;
  }
}
//* --------------CREATE INITIAL WISHLISTS-------------

module.exports = {
  createInitialWishlists,
};
