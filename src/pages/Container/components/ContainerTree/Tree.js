import React, {useCallback} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

// components
import {default as TreeView} from 'components/layouts/Admin/components/Tree';
// utils
import {treeOpts} from './utils';

function Tree({
  treeData,
  flatTreeData,
  defaultExpandedKeys = [],
  defaultSelectedKeys = []
}) {
  const navigate = useNavigate();
  const {cid: containerId, tag} = useParams();

  const handleSelectNode = useCallback(
    ({node, selectedKeys, selected}) => {
      const level = selectedKeys[0]?.split(treeOpts.separateKey)?.length || 0;

      if (level === 1) {
        navigate(`/container/${node.originData.id}`);
      }
      if (level === 2) {
        const {cid, id, navigate: gotoLink} = node.originData;
        if (id === tag) {
          return;
        }
        if (id === 'import-offline' || id === 'transfer-files') {
          navigate(gotoLink);
        } else {
          navigate(`/container/${cid}/${id}`);
        }
      }
      if (level === 3) {
        navigate(`/container/${containerId}/${tag}/${node.originData.id}`);
      }
    },
    [containerId, navigate, tag]
  );

  return (
    <TreeView
      treeData={treeData}
      flatTreeData={flatTreeData}
      showChecked={false}
      showSearch={false}
      expandedKeys={defaultExpandedKeys}
      selectedKeys={defaultSelectedKeys}
      expandParent={false}
      handleExpand={() => {}}
      handleSelectNode={handleSelectNode}
    />
  );
}

export default React.memo(Tree);
