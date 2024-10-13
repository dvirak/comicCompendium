function formatGetRelationItems(info) {
  let formattedInfo = {};
  for (const each of info) {
    if (!formattedInfo[each.relation_type]) {
      formattedInfo[each.relation_type] = each.relation_name;
    } else {
      formattedInfo[each.relation_type] += `, ${each.relation_name}`;
    }
  }

  return formattedInfo;
}
module.exports = formatGetRelationItems;
