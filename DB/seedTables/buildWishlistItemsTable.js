async function buildWishListItemsTable() {
  console.log("STARTING TO BUILD WishListItems TABLE...");
  try {
    await client.query(`
  CREATE TABLE wishlist_items (
    id SERIAL PRIMARY KEY,
    wishlist_id INTEGER REFERENCES wishlists(id),
    book_id INTEGER REFERENCES books(id),
    UNIQUE (wishlist_id, book_id)
  );
`);
  } catch (error) {
    console.error("Error creating WishListItems tables: " + error.message);
    throw error;
  }
}

module.exports = {
  buildWishListItemsTable,
};

//     await client.query(`
//   CREATE TABLE wishlist_items (
//     id SERIAL PRIMARY KEY,
//     wishlist_id INTEGER REFERENCES wishlists(id),
//     book_id INTEGER REFERENCES books(id),
//     UNIQUE (wishlist_id, book_id)
//   );
// `);
