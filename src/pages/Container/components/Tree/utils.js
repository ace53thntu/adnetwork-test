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

export function unSelectedAndUnExpanded(item) {
  if (item?.children?.length) {
    return {
      ...item,
      expanded: false,
      selected: false,
      children: [...item.children].map(child => unSelectedAndUnExpanded(child))
    };
  }
  return {
    ...item,
    selected: false,
    expanded: false
  };
}
