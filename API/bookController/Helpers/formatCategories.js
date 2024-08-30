// Helper function to format the categories
function formatCategories(categoryNames) {
  return Object.entries(categoryNames)
    .map(([key, value]) => `${key}: '${value}'`)
    .join(" with ");
}

module.exports = formatCategories;
