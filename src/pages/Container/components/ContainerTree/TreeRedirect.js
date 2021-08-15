import React, {useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

import {useContainerStore} from '../../context';

import {CONTAINER_TREE_TAGS} from './constants';

import ContainerWebsiteTag from '../ContainerWebsiteTag';
import ContainerIOSTag from '../ContainerIOSTag';
import ContainerImportOffline from '../ContainerImportOffline';
import ContainerTransfer from '../ContainerTransfer';

function TreeLevelTwoRedirect() {
  const {cid: containerId, tag, pageId} = useParams();
  const navigate = useNavigate();
  const {
    selectContainer,
    selectTag,
    selectPage,
    resetState
  } = useContainerStore();

  useEffect(() => {
    if (containerId) {
      selectContainer(containerId);
      if (tag) {
        selectTag(tag);
      }
      if (pageId) {
        if (pageId === 'create') {
          navigate(`/container/${containerId}`);
        } else {
          selectPage(pageId);
        }
      }
    }

    return () => {
      resetState();
    };
  }, [
    containerId,
    navigate,
    pageId,
    resetState,
    selectContainer,
    selectPage,
    selectTag,
    tag
  ]);

  if (tag === CONTAINER_TREE_TAGS[0].id && pageId) {
    return <ContainerWebsiteTag pageId={pageId} />;
  }

  if (tag === CONTAINER_TREE_TAGS[1].id && pageId) {
    return <ContainerIOSTag pageId={pageId} />;
  }
  if (tag === CONTAINER_TREE_TAGS[2].id) {
    return <ContainerImportOffline />;
  }
  if (tag === CONTAINER_TREE_TAGS[3].id) {
    return <ContainerTransfer />;
  }
  return <div>Loading...</div>;
}

export default TreeLevelTwoRedirect;
