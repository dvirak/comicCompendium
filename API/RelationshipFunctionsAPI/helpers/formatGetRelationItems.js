/**
 * Description: Formats relation information for a book by aggregating related items
 * under their respective relation types (e.g., authors, genres, series).
 *
 * The function iterates through the provided relation information and organizes it into
 * a key-value structure, where the keys are the relation types (e.g., 'authors', 'genres')
 * and the values are the related items (e.g., author names, genre names) concatenated into a string.
 *
 * @param {Array} info - An array of relation information objects, where each object
 * contains `relation_type` and `relation_name` properties.
 * @returns {Object} formattedInfo - An object where the keys are relation types and the
 * values are comma-separated strings of related items.
 */
function formatGetRelationItems(info) {
  let formattedInfo = {}; // Initialize an empty object to hold the formatted information

  // Loop through each item in the relation info array
  for (const each of info) {
    // If the relation type doesn't exist in the object, add it and set its value to the relation name
    if (!formattedInfo[each.relation_type]) {
      formattedInfo[each.relation_type] = each.relation_name;
    } else {
      // If the relation type already exists, append the new relation name to the existing value
      formattedInfo[each.relation_type] += `, ${each.relation_name}`;
    }
  }

  return formattedInfo; // Return the formatted relation information object
}

module.exports = formatGetRelationItems;
