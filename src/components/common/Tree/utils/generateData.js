const isValidItemHasChild = itemChildKey => {
  if (itemChildKey && itemChildKey.length) return true;
  return false;
};

export const generateData = (
  data,
  {titleKey = 'title', idKey = 'id', childKey = 'childs', separateKey = '-'},
  _preKey,
  _tns = []
) => {
  for (let i = 0; i < data.length; i++) {
    const currentItem = data[i];
    const key = _preKey
      ? `${_preKey}${separateKey}${currentItem[idKey]}`
      : currentItem[idKey];

    if (isValidItemHasChild(currentItem[childKey])) {
      const children = generateData(
        currentItem[childKey],
        {titleKey, idKey, childKey, separateKey},
        key,
        []
      );
      _tns.push({
        title: currentItem[titleKey],
        key,
        children,
        originData: {...currentItem},
        isLeaf: currentItem?.isLeaf || false
      });
    } else {
      _tns.push({
        title: currentItem[titleKey],
        key,
        originData: {...currentItem},
        isLeaf: currentItem?.isLeaf || false
      });
    }
  }
  return _tns;
};

export const generateDataForInput = (
  data,
  {titleKey = 'title', idKey = 'id', childKey = 'children'},
  _preKey,
  _tns = []
) => {
  for (let i = 0; i < data.length; i++) {
    const currentItem = data[i];
    const value = _preKey
      ? `${_preKey}-${currentItem[idKey]}`
      : currentItem[idKey];

    if (isValidItemHasChild(currentItem[childKey])) {
      const children = generateDataForInput(
        currentItem[childKey],
        {titleKey, idKey, childKey},
        value,
        []
      );
      _tns.push({
        title: currentItem[titleKey],
        value,
        children,
        originData: {...currentItem}
      });
    } else {
      _tns.push({
        title: currentItem[titleKey],
        value,
        originData: {...currentItem}
      });
    }
  }
  return _tns;
};

export const generateList = (data, dataList = []) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    // const {key, title, originData} = node;
    dataList.push(node);
    if (node.children) {
      generateList(node.children, dataList);
    }
  }
  return dataList;
};

export const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

export const getExpandedKeysWhenSearch = (
  flatTreeData,
  treeData,
  searchValue
) => {
  return flatTreeData
    .map(item => {
      if (item.title.indexOf(searchValue) > -1) {
        return getParentKey(item.key, treeData);
      }
      return null;
    })
    .filter((item, i, self) => item && self.indexOf(item) === i);
};

export const getAllParentKey = (key, separateKey = '-') => {
  if (!key) return null;
  const splitKey = key.split(separateKey);
  const level = splitKey.length;
  const parentCount = level - 1;
  let parentKeys = [splitKey[0]];
  for (let i = 1; i < parentCount; i++) {
    parentKeys.push(`${splitKey[i - 1]}-${splitKey[i]}`);
  }
  return parentKeys;
};

export const getAllParent = (parentKeys, flatTree) => {
  if (!parentKeys || !flatTree.length) return null;
  return flatTree
    .filter(node => parentKeys.includes(node.key))
    .map(node => node.originData);
};

export const generateDataNoIncludeParentKey = (
  data,
  {titleKey = 'title', idKey = 'id', childKey = 'childs', separateKey = '-'},
  _preKey,
  _tns = []
) => {
  for (let i = 0; i < data.length; i++) {
    const currentItem = data[i];
    const key = currentItem[idKey];

    if (isValidItemHasChild(currentItem[childKey])) {
      const children = generateDataNoIncludeParentKey(
        currentItem[childKey],
        {titleKey, idKey, childKey, separateKey},
        key,
        []
      );
      _tns.push({
        title: currentItem[titleKey],
        key,
        children,
        originData: {...currentItem},
        isLeaf: currentItem?.isLeaf || false
      });
    } else {
      _tns.push({
        title: currentItem[titleKey],
        key,
        originData: {...currentItem},
        isLeaf: currentItem?.isLeaf || false
      });
    }
  }
  return _tns;
};
