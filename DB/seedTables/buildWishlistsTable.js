async function buildWishListsTable() {
  console.log("STARTING TO BUILD WishLists TABLE...");
  try {
    await client.query(`
  CREATE TABLE wishlists (
    id SERIAL PRIMARY KEY,
    wishlist_name VARCHAR(255) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id)
  );
`);
  } catch (error) {
    console.error("Error creating WishLists tables: " + error.message);
    throw error;
  }
}

module.exports = {
  buildWishListsTable,
};

//     await client.query(`
//   CREATE TABLE wishlists (
//     id SERIAL PRIMARY KEY,
//     wishlist_name VARCHAR(255) UNIQUE NOT NULL,
//     user_id INTEGER REFERENCES users(id)
//   );
// `);
