async function checkOrCreateBookDB(
  title,
  publish_date,
  description,
  print_length,
  series_volume,
  cover_image
) {
  let book = await getSingleBookDB(title);

  if (!book) {
    book = await createBookDB(
      title,
      publish_date,
      description,
      print_length,
      series_volume,
      cover_image
    );
  }

  return book.id;
}

module.exports = checkOrCreateBookDB;
