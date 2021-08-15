import React from 'react';
import {useParams} from 'react-router-dom';

import ContainerSideBar from '../ContainerSideBar';
import AppContent from 'layouts/Admin/components/AppContent';
import ContainerWebsiteTag from '../ContainerWebsiteTag';
import ContainerIOSTag from '../ContainerIOSTag';
import ContainerImportOffline from '../ContainerImportOffline';
import ContainerTransfer from '../ContainerTransfer';
import {CONTAINER_TREE_TAGS} from './constants';
import {useContainers} from 'pages/Container/hooks/useContainers';

function ContainerTreePages() {
  const {tag, pageId, cid: containerId} = useParams();

  const {isFetching: loading} = useContainers({});

  if (loading) {
    return <div>Loading...</div>;
  }

  let content = null;

  if (tag === CONTAINER_TREE_TAGS[0].id) {
    content = <ContainerWebsiteTag pageId={pageId} />;
  }

  if (tag === CONTAINER_TREE_TAGS[1].id) {
    content = <ContainerIOSTag pageId={pageId} />;
  }

  if (tag === CONTAINER_TREE_TAGS[2].id) {
    content = <ContainerIOSTag pageId={pageId} />;
  }

  if (tag === CONTAINER_TREE_TAGS[3].id) {
    content = <ContainerImportOffline />;
  }
  if (tag === CONTAINER_TREE_TAGS[4].id) {
    content = <ContainerTransfer />;
  }

  return (
    <>
      <ContainerSideBar containerId={containerId} />
      <AppContent>{content}</AppContent>
    </>
  );
}

export default ContainerTreePages;
