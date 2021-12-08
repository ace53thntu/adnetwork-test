//---> Build-in Modules
import React from 'react';

//--->
import {useParams} from 'react-router-dom';

import ContainerWebsiteTag from '../ContainerWebsiteTag';
import ContainerIOSTag from '../ContainerIOSTag';
import ContainerImportOffline from '../ContainerImportOffline';
import ContainerTransfer from '../ContainerTransfer';
import {CONTAINER_TREE_TAGS} from './constants';
import {useContainers} from 'pages/Container/hooks/useContainers';
import {ContainerBodyLayout} from '../Layouts';
import {useGetInventoryByPage} from 'queries/inventory';

function ContainerTreePages() {
  const {tag, pageId} = useParams();
  console.log(
    '🚀 ~ file: ContainerTreePages.js ~ line 18 ~ ContainerTreePages ~ pageId',
    pageId
  );

  const {isFetching: loading} = useContainers({suspense: false});
  const {data: {items: inventories = []} = []} = useGetInventoryByPage(pageId);

  if (loading) {
    return <div>Loading...</div>;
  }

  let content = null;

  if (tag === CONTAINER_TREE_TAGS[0].id) {
    content = <ContainerWebsiteTag pageId={pageId} inventories={inventories} />;
  }

  if (tag === CONTAINER_TREE_TAGS[1].id) {
    content = <ContainerIOSTag pageId={pageId} inventories={inventories} />;
  }

  if (tag === CONTAINER_TREE_TAGS[2].id) {
    content = <ContainerIOSTag pageId={pageId} inventories={inventories} />;
  }

  if (tag === CONTAINER_TREE_TAGS[3].id) {
    content = <ContainerImportOffline />;
  }
  if (tag === CONTAINER_TREE_TAGS[4].id) {
    content = <ContainerTransfer />;
  }

  return <ContainerBodyLayout>{content}</ContainerBodyLayout>;
}

export default ContainerTreePages;
