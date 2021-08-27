import React, {useEffect, useMemo, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

// utils
import {
  makeTreeData,
  generateTree,
  generateFlatTree,
  makeTreeDataSources,
  getNewTreeData
} from './utils';

import Tree from './Tree';
import {useGetPages} from 'pages/Container/hooks/usePages';
import {SOURCE_FROM_TAG, CONTAINER_TREE_TAGS} from './constants';
import {useGetContainer} from 'queries/container/useGetContainer';

function ContainersTree({containers = []}) {
  const {cid: containerId, tag, pageId} = useParams();

  const nodeData = useMemo(() => makeTreeData(containers), [containers]);
  const treeData = useMemo(() => generateTree(nodeData), [nodeData]);
  const flatTreeData = useMemo(() => generateFlatTree(treeData), [treeData]);

  if (!containerId) {
    return <ContainerTree treeData={treeData} flatTreeData={flatTreeData} />;
  }

  if (containerId && !tag && !pageId) {
    return (
      <ContainerTreeSources treeData={treeData} containerId={containerId} />
    );
  }

  if (tag && !pageId) {
    return (
      <ContainerTreeWithTag
        treeData={treeData}
        containerId={containerId}
        tag={tag}
      />
    );
  }

  if (tag && pageId) {
    if (
      tag === CONTAINER_TREE_TAGS[3].id ||
      tag === CONTAINER_TREE_TAGS[4].id
    ) {
      return (
        <ContainerTreeSources
          treeData={treeData}
          containerId={containerId}
          tag={tag}
        />
      );
    } else {
      return (
        <ContainerTreeWithPages
          treeData={treeData}
          containerId={containerId}
          tag={tag}
          pageId={pageId}
        />
      );
    }
  }

  return null;
}

export default React.memo(ContainersTree);

function ContainerTree({flatTreeData, treeData}) {
  return (
    <div>
      <Tree treeData={treeData} flatTreeData={flatTreeData} />
    </div>
  );
}

function ContainerTreeSources({containerId, treeData, tag}) {
  const {data: container} = useGetContainer(containerId);

  const {source = {}, import_count = 0, transfer_count = 0} = container ?? {};

  const {
    data: treeDataHasSources,
    flatData: flatTreeDataHasSources
  } = useMemo(() => {
    return makeTreeDataSources({
      treeData,
      containerId,
      containerSources: source,
      containerImports: import_count,
      containerTransfer: transfer_count
    });
  }, [treeData, containerId, source, import_count, transfer_count]);

  const expandedKeys = [containerId];
  const selectedKeys = tag ? [`${containerId}|${tag}`] : [`${containerId}`];

  return (
    <div>
      <Tree
        treeData={treeDataHasSources}
        flatTreeData={flatTreeDataHasSources}
        defaultExpandedKeys={expandedKeys}
        defaultSelectedKeys={selectedKeys}
      />
    </div>
  );
}

function ContainerTreeWithTag({containerId, tag}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(timeout);
      setIsLoading(true);
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <TreeTags containerId={containerId} tag={tag} />;
}

function TreeTags({containerId, tag}) {
  const {data: pagesRes, isFetching} = useGetPages({
    containerId,
    source: SOURCE_FROM_TAG[tag]
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (!pagesRes?.length) {
    return <Redirect to={`/container/${containerId}`} />;
  }
  return <Redirect to={`/container/${containerId}/${tag}/${pagesRes[0].id}`} />;
}

function Redirect({to}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (to) {
      navigate(to);
    }
  }, [navigate, to]);

  return null;
}

function ContainerTreeWithPages({containerId, treeData, tag, pageId}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(timeout);
      setIsLoading(true);
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PagesTree
      containerId={containerId}
      treeData={treeData}
      tag={tag}
      pageId={pageId}
    />
  );
}

function PagesTree({containerId, treeData, tag, pageId}) {
  const {data: container, isFetching: isFetchingGetContainer} = useGetContainer(
    containerId
  );

  const {data: pagesRes, isFetching: isFetchingGetPages} = useGetPages({
    containerId,
    source: SOURCE_FROM_TAG[tag]
  });

  if (isFetchingGetContainer || isFetchingGetPages) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TreeView
        treeData={treeData}
        container={container}
        containerId={containerId}
        tag={tag}
        pages={pagesRes}
        pageId={pageId}
      />
    </div>
  );
}

function TreeView({treeData, containerId, container, tag, pages, pageId}) {
  const {source = {}, import_count = 0, transfer_count = 0} = container ?? {};

  const {data: treeDataHasSources} = useMemo(() => {
    return makeTreeDataSources({
      treeData,
      containerId,
      containerSources: source,
      containerImports: import_count,
      containerTransfer: transfer_count
    });
  }, [treeData, containerId, source, import_count, transfer_count]);

  const {tree: newTree = [], flatTree: newFlatTree} = useMemo(() => {
    return getNewTreeData(treeDataHasSources, `${containerId}|${tag}`, pages);
  }, [containerId, pages, tag, treeDataHasSources]);

  const expandedKeys = [containerId, `${containerId}|${tag}`];
  const selectedKeys = [`${containerId}|${tag}|${pageId}`];

  return (
    <Tree
      treeData={newTree}
      flatTreeData={newFlatTree}
      defaultExpandedKeys={expandedKeys}
      defaultSelectedKeys={selectedKeys}
    />
  );
}
