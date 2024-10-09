function formatGetRelationItems(info) {
  let formattedInfo = {};
  console.log(typeof info);
  for (const each of info) {
    console.log(each.relation_type);
    console.log(typeof each.relation_name);
    formattedInfo[each.relation_type] = each.relation_name;
    if (!formattedInfo[each.relation_type]) {
      formattedInfo[each.relation_type] = each.relation_name;
    } else {
      formattedInfo[each.relation_type] = [
        ...formattedInfo[each.relation_type],
        each.relation_name,
      ];
    }
  }

  return formattedInfo;
}
module.exports = formatGetRelationItems;
