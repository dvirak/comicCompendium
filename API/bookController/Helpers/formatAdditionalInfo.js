/**
 * Description: Formats additional information from an input object into a structured output.
 *
 * This function processes an object containing additional information about relations,
 * grouping the relation names by their relation types. If multiple relation names exist
 * for the same type, they are concatenated into a single string, separated by commas.
 *
 * @param {Object} additionalInfo - An object containing information about various relations.
 * Each key in the object is expected to correspond to a relation, with properties:
 * - `relation_type` (string): The type of relation (e.g., author, illustrator).
 * - `relation_name` (string): The name of the relation (e.g., "John Doe").
 *
 * @returns {Object} formattedInfo - An object where each key is a relation type and its value
 * is a string of concatenated relation names associated with that type.
 *
 * @example
 * Input:
 * const additionalInfo = {
 *   1: { relation_type: 'author', relation_name: 'John Doe' },
 *   2: { relation_type: 'author', relation_name: 'Jane Smith' },
 *   3: { relation_type: 'illustrator', relation_name: 'Alice Brown' },
 * };
 *
 * Output:
 * {
 *   author: 'John Doe, Jane Smith',
 *   illustrator: 'Alice Brown',
 * }
 */
function formatAdditionalInfo(additionalInfo) {
  console.log("In format additional info");
  let formattedInfo = {};

  for (const [key, value] of Object.entries(additionalInfo)) {
    if (!formattedInfo[value.relation_type]) {
      formattedInfo[value.relation_type] = value.relation_name;
    } else {
      const newString = [
        formattedInfo[value.relation_type],
        value.relation_name,
      ].join(", ");
      formattedInfo[value.relation_type] = newString;
    }
  }
  return formattedInfo;
}

module.exports = formatAdditionalInfo;
