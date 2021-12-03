import './styles.scss';

import PropTypes from 'prop-types';
import RcTree from 'rc-tree';
import React, {useEffect, useState} from 'react';

import Paper from '@material-ui/core/Paper';

import {useStyles} from './styles';
import renderSwitcherIcon from './utils/iconUtils';

export const motion = {
  motionName: 'node-motion',
  motionAppear: false,
  onAppearStart: () => ({height: 0}),
  onAppearActive: node => ({height: node.scrollHeight}),
  onLeaveStart: node => ({height: node.offsetHeight}),
  onLeaveActive: () => ({height: 0})
};

// NOTE - không sửa bất cứ code trong component này mà không thông qua Em Dinh.

const TreeView = ({
  treeData,
  flatTreeData,
  showSearch,
  showChecked,
  expandedKeys,
  searchValue,
  expandParent,
  handleExpand,
  handleDropTree,
  handleCheckNode,
  handleSelectNode,
  selectedKeys,
  defaultCheckedKeys,
  draggable,
  size,
  loadData = () => Promise.resolve(),
  defaultExpandedKeys,
  onLoad = () => {},
  disabled = false,
  bullet = true
}) => {
  const classes = useStyles();
  //use checkedDefault to update anytime segment change in audience create;
  const [checkedDefault, setCheckedDefault] = useState(defaultCheckedKeys);

  const onDragStart = info => {
    console.log('start', info);
  };

  const onDragEnter = React.useCallback(
    info => {
      handleExpand(info.expandedKeys);
    },
    [handleExpand]
  );

  const onExpand = React.useCallback(
    expandedKeys => {
      handleExpand(expandedKeys);
    },
    [handleExpand]
  );

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setCheckedDefault(defaultCheckedKeys);
    }
    return () => {
      isMounted = false;
    };
  }, [defaultCheckedKeys]);

  const onCheck = React.useCallback(
    (checkedKeys, {checked, checkedNodes, node, event, nativeEvent}) => {
      setCheckedDefault(checkedKeys);
      const trueCheckedNodes = flatTreeData
        .filter(flatNode => checkedKeys.checked.includes(flatNode.key))
        .map(flatNode => flatNode);
      const originNode = flatTreeData.filter(fnode => fnode.key === node.key)[0]
        .originData;
      // const originNode = flatTreeData.filter(fnode => fnode.key === node.key)[0]

      handleCheckNode(originNode, trueCheckedNodes);
    },
    [flatTreeData, handleCheckNode]
  );

  const onDrop = info => {
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          callback(item, index, arr);
          return;
        }
        if (item.children) {
          loop(item.children, key, callback);
        }
      });
    };
    const data = [...treeData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert
        item.children.unshift(dragObj);
      });
    } else {
      // Drop on the gap
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    // setGData(data);
    handleDropTree(data);
  };

  const loop = React.useCallback(
    data =>
      data.map(item => {
        const {title: itemTitle} = item;

        const index = itemTitle.indexOf(searchValue);

        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);

        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span className="site-tree-search-value">{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.title}</span>
          );
        if (item.children) {
          return {
            ...item,
            title,
            key: item.key,
            children: loop(item.children)
          };
        }

        return {
          ...item,
          title,
          key: item.key
        };
      }),
    [searchValue]
  );

  const onSelectNode = React.useCallback(
    (selectedKeys, {selected, selectedNodes, node, event, nativeEvent}) => {
      handleSelectNode({
        node,
        selectedKeys,
        selected
      });
    },
    [handleSelectNode]
  );

  return (
    <Paper
      elevation={0}
      className={size === 'audience' ? classes.rootAudience : classes.root}
    >
      <RcTree
        expandedKeys={expandedKeys}
        selectedKeys={selectedKeys}
        onExpand={onExpand}
        autoExpandParent={expandParent}
        onSelect={onSelectNode}
        draggable={draggable}
        checkable={
          showChecked ? <span className={`dmp-tree-checkbox-inner`} /> : false
        }
        onDragStart={onDragStart}
        onDragEnter={onDragEnter}
        onDrop={onDrop}
        switcherIcon={nodeProps =>
          renderSwitcherIcon('dmp-tree', nodeProps, bullet)
        }
        treeData={showSearch ? loop(treeData) : treeData}
        prefixCls="dmp-tree"
        onCheck={onCheck}
        checkStrictly={true} //parent and children are separate
        checkedKeys={checkedDefault} //update checked item when change segment
        virtual
        motion={motion}
        // loadData={loadData}
        // onLoad={onLoad}
        disabled={disabled}
      />
    </Paper>
  );
};

TreeView.propTypes = {
  treeData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      children: PropTypes.arrayOf(PropTypes.object),
      originalData: PropTypes.object
    })
  ).isRequired,
  flatTreeData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      originalData: PropTypes.object
    })
  ).isRequired,
  showSearch: PropTypes.bool,
  showChecked: PropTypes.bool,
  expandedKeys: PropTypes.arrayOf(PropTypes.string),
  searchValue: PropTypes.string,
  expandParent: PropTypes.bool,
  draggable: PropTypes.bool,
  handleExpand: PropTypes.func.isRequired,
  handleDropTree: PropTypes.func,
  handleCheckNode: PropTypes.func,
  handleSelectNode: PropTypes.func.isRequired
};

TreeView.defaultProps = {
  treeData: [],
  flatTreeData: [],
  showSearch: false,
  showChecked: false,
  expandedKeys: [],
  searchValue: '',
  expandParent: false,
  draggable: false,
  handleExpand: () => {},
  handleDropTree: () => {},
  handleCheckNode: () => {},
  handleSelectNode: () => {}
};

export default TreeView;
