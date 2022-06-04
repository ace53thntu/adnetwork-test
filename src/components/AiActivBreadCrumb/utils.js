import _ from 'lodash';

export function flattenMyTree(tree) {
  function recurse(nodes, path) {
    return _.map(nodes, function (node) {
      const newPath = _.union(path, [node.name]);
      return [
        _.assign(
          {pathname: newPath.join(' > '), level: path.length},
          _.omit(node, 'children')
        ),
        recurse(node.children, newPath)
      ];
    });
  }
  return _.flattenDeep(recurse(tree, []));
}
