export const buildCache = (cache, nodes) => {
  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    cache[node.id] = node;
    const {children} = node;
    if (children && children.constructor === Array && children.length > 0) {
      buildCache(cache, children);
    }
  }
  return cache;
};

export const hasChildren = node => node.numChildren > 0;

export const isFullyFetched = (node, numChildren) =>
  numChildren === node.numChildren;

export const shouldShowMore = (node, numChildren) =>
  numChildren < node.numChildren;
