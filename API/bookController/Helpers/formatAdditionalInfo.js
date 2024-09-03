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
