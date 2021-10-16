export function unSelectedChild(item) {
  if (item?.children?.length) {
    return {
      ...item,
      selected: false,
      children: [...item.children].map(child => unSelectedChild(child))
    };
  }
  return {
    ...item,
    selected: false,
    expanded: false
  };
}
