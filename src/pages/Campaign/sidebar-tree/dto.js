export function unSelectedCampaignTree(item) {
  if (item?.children?.length) {
    return {
      ...item,
      selected: false,
      children: [...item.children].map(child => unSelectedCampaignTree(child))
    };
  }
  return {
    ...item,
    selected: false
  };
}
