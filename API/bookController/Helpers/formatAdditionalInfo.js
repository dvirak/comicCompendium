function formatAdditionalInfo(additionalInfo) {
  console.log("In format additional info");
  let formattedInfo = {};
  console.log(typeof additionalInfo);
  for (const [key, value] of Object.entries(additionalInfo)) {
    console.log("NEXT ENTRY");
    console.log(value.relation_type);
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
  console.log(formattedInfo);
  return formattedInfo;
}

module.exports = formatAdditionalInfo;
