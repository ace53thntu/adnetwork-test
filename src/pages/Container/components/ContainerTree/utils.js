import {treeUtils} from 'components/layouts/Admin/components/Tree';
import {CONTAINER_TREE_TAGS} from './constants';

/**
 * For tree view data, there are two type of data
 * - tree data
 * - flat data
 */
export const treeOpts = {
  titleKey: 'name',
  idKey: 'id',
  childKey: 'children',
  separateKey: '|'
};

export function generateTree(data) {
  return treeUtils.generateData(data, treeOpts);
}
export function generateFlatTree(treeData) {
  return treeUtils.generateList(treeData);
}

const sources = {
  [CONTAINER_TREE_TAGS[0].id]: 'web',
  [CONTAINER_TREE_TAGS[1].id]: 'ios',
  [CONTAINER_TREE_TAGS[2].id]: 'android'
};

export const makeTreeData = (data = []) => {
  return Array.from(data, ({id, name = ''}) => {
    return {
      id,
      name,
      navigate: `${id}`,
      isLeaf: false,
      children: []
    };
  });
};

const tagIds = {
  web: 'website-tag',
  ios: 'ios-tag',
  android: 'android-tag',
  import: 'import-offline',
  transfer: 'transfer-files'
};
const tagNames = {
  web: 'Website tag',
  ios: 'iOS tag',
  android: 'Android tag',
  import: 'Manual importation',
  transfer: 'Schedule transfer'
};

export const makeTreeDataSources = ({
  treeData,
  containerSources,
  containerId,
  containerImports = 0,
  containerTransfer = 0
}) => {
  const newTree = treeData.map(node => {
    if (node.key === containerId) {
      const allSources = Object.keys(containerSources);

      const childSources = Array.from(allSources, (sourceName, idx) => ({
        id: tagIds[sourceName],
        name: tagNames[sourceName],
        isLeaf: false,
        cid: containerId,
        source: sources[CONTAINER_TREE_TAGS[idx].id] || null,
        navigate: `/container/${containerId}/${CONTAINER_TREE_TAGS[idx].id}/create`
      }));

      const childImport =
        containerImports > 0
          ? [
              {
                id: tagIds['import'],
                name: tagNames['import'],
                isLeaf: true,
                cid: containerId,
                source: null,
                navigate: `/container/${containerId}/import-offline/create`
              }
            ]
          : [];

      const childTransfer =
        containerTransfer > 0
          ? [
              {
                id: tagIds['transfer'],
                name: tagNames['transfer'],
                isLeaf: true,
                cid: containerId,
                source: null,
                navigate: `/container/${containerId}/transfer-files/create`
              }
            ]
          : [];

      const treeChilds = generateTree([
        ...childSources,
        ...childImport,
        ...childTransfer
      ]);

      return {
        ...node,
        children: treeChilds.map(item => ({
          ...item,
          key: `${containerId}|${item.key}`
        }))
      };
    }
    return node;
  });
  const flatTree = generateFlatTree(newTree);
  return {
    data: newTree,
    flatData: flatTree
  };
};

function prepareTreeData(data = [], parentId) {
  return Array.from(data, ({id, name, source}) => ({
    id,
    name,
    children: [],
    isLeaf: true,
    parentId,
    source
  }));
}

export const getNewTreeData = (treeData, curKey, child) => {
  const keys = curKey.split('|');
  let findKeys = [];

  keys.forEach((key, index) => {
    if (index === 0) {
      findKeys.push(key);
    } else {
      findKeys.push(`${findKeys[index - 1]}|${key}`);
    }
  });

  let treeChild = [];

  if (child?.length) {
    const parentId = treeUtils.getParentKey(curKey, treeData);
    const children = prepareTreeData(child, parentId);
    const treeChilds = generateTree(children);
    treeChild = treeChilds.map(item => {
      const {source, parentId: containerId, id} = item.originData;
      if (source === 'web') {
        return {
          ...item,
          key: `${containerId}|${CONTAINER_TREE_TAGS[0].id}|${id}`,
          originData: {
            ...item.originData,
            navigate: `${containerId}/${CONTAINER_TREE_TAGS[0].id}/${id}`
          }
        };
      }
      if (source === 'ios') {
        return {
          ...item,
          key: `${containerId}|${CONTAINER_TREE_TAGS[1].id}|${id}`,

          originData: {
            ...item.originData,
            navigate: `${containerId}/${CONTAINER_TREE_TAGS[1].id}/${id}`
          }
        };
      }
      if (source === 'android') {
        return {
          ...item,
          key: `${containerId}|${CONTAINER_TREE_TAGS[2].id}|${id}`,

          originData: {
            ...item.originData,
            navigate: `${containerId}/${CONTAINER_TREE_TAGS[2].id}/${id}`
          }
        };
      }
      return item;
      // TODO: key for other source: android, import offline, transfer
    });
  }

  const tempTree = [...treeData];

  const loop = data => {
    if (!findKeys.length) return;

    data.forEach(item => {
      if (item.key === findKeys[0]) {
        if (item?.children?.length) {
          findKeys.shift();
          loop(item.children);
        } else {
          item.children = treeChild;
          if (!treeChild?.length) {
            item.isLeaf = true;
          }
        }
      }
    });
  };
  loop(tempTree);
  const flatTree = generateFlatTree(tempTree);
  return {
    tree: tempTree,
    flatTree
  };
};

export const reloadPageInTree = (treeData, curKey, pages) => {
  const keys = curKey.split('|');
  let findKeys = [];

  keys.forEach((key, index) => {
    if (index === 0) {
      findKeys.push(key);
    } else {
      findKeys.push(`${findKeys[index - 1]}|${key}`);
    }
  });

  const parentId = treeUtils.getParentKey(curKey, treeData);
  const children = prepareTreeData(pages, parentId);
  const treePages = generateTree(children);
  const convertedTreePages = treePages.map(item => {
    const {source, parentId: containerId, id} = item.originData;
    if (source === 'web') {
      return {
        ...item,
        key: `${containerId}|${CONTAINER_TREE_TAGS[0].id}|${id}`,
        originData: {
          ...item.originData,
          navigate: `${containerId}/${CONTAINER_TREE_TAGS[0].id}/${id}`
        }
      };
    }
    if (source === 'ios') {
      return {
        ...item,
        key: `${containerId}|${CONTAINER_TREE_TAGS[1].id}|${id}`,

        originData: {
          ...item.originData,
          navigate: `${containerId}/${CONTAINER_TREE_TAGS[1].id}/${id}`
        }
      };
    }
    return item;
    // TODO: key for other source: android, import offline, transfer
  });

  const tempTree = treeData.reduce((acc, container) => {
    if (container.key === findKeys[0]) {
      const updated = container.children.reduce((tagAcc, tag) => {
        if (tag.key === findKeys[1]) {
          return [
            ...tagAcc,
            {
              ...tag,
              children: convertedTreePages
            }
          ];
        }
        return [...tagAcc, tag];
      }, []);

      return [
        ...acc,
        {
          ...container,
          children: updated
        }
      ];
    }
    return [...acc, container];
  }, []);

  const flatTree = generateFlatTree(tempTree);
  return {
    tree: tempTree,
    flatTree
  };
};

export function makeExpandKeys(pathname = '') {
  const urls = pathname.split('/');
  urls.splice(0, 2);
  let keys = [];
  urls.forEach((key, idx) => {
    if (idx === 0) {
      keys.push(key);
    } else {
      keys.push(`${keys[idx - 1]}${treeOpts.separateKey}${key}`);
    }
  });

  return keys;
}
