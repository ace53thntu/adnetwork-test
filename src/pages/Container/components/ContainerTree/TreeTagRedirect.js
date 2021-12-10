import React, {useEffect} from 'react';
import {useParams, useNavigate, Outlet} from 'react-router-dom';

import {useContainerStore} from '../../context';
import {CONTAINER_TREE_TAGS} from './constants';
import {useGetPages} from 'pages/Container/hooks/usePages';

function TreeLevelTwoRedirect() {
  const {cid: containerId, tag} = useParams();
  const navigate = useNavigate();
  const {setPages} = useContainerStore();

  const source = CONTAINER_TREE_TAGS[tag];

  const {data: pages = [], isFetching} = useGetPages({containerId, source});

  // useEffect(() => {
  //   if (containerId) {
  //     selectContainer(containerId);
  //     if (tag) {
  //       selectTag(tag);
  //     }
  //   }

  //   return () => {
  //     console.log('unmount TreeLevelTwoRedirect tag: ', pages);
  //     resetState();
  //   };
  // }, [
  //   containerId,
  //   pages,
  //   resetState,
  //   selectContainer,
  //   selectPage,
  //   selectTag,
  //   tag
  // ]);

  useEffect(() => {
    if (!isFetching && pages) {
      setPages(pages);
      if (pages?.[0]?.id) {
        navigate(`./${pages[0].id}`);
      }
    }
  }, [isFetching, navigate, pages, setPages]);

  return <Outlet />;
}

export default TreeLevelTwoRedirect;
