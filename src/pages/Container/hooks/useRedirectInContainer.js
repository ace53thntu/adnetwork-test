import {
  setContainerRedux,
  useContainerSelector
} from 'store/reducers/container';
import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router';
import {useGetContainer} from 'queries/container';
import {useGetAllPage} from 'queries/page';

export function useRedirectInContainer() {
  const {cid: containerId, source, pageId} = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isLoading,
    container: containerRedux,
    alreadySetContainer
  } = useContainerSelector();

  const enabled = containerRedux?.id !== containerId;
  console.log(
    '🚀 ~ file: useRedirectInContainer.js ~ line 23 ~ useRedirectInContainer ~ containerId',
    containerId
  );

  const {
    data: container,
    isFetching,
    status,
    isError,
    error,
    isFetched
  } = useGetContainer({containerId, enabled});

  const {data: {items: pages = []} = {}, status: pageStatus} = useGetAllPage({
    containerId,
    params: {
      source
    },
    enabled: !!containerId && isFetched
  });
  console.log(
    '🚀 ~ file: useRedirectInContainer.js ~ line 30 ~ useRedirectInContainer ~ pages',
    pages
  );
  const destructurePages = React.useMemo(
    () =>
      pages?.map(item => {
        const pageNode = {
          id: item.uuid,
          name: item.name,
          children: [],
          numChildren: 0,
          page: 0,
          expanded: false,
          selected: false,
          parentId: source,
          isPage: true,
          containerId
        };
        return pageNode;
      }),
    [containerId, pages, source]
  );

  React.useEffect(() => {
    if (status === 'success' && !isLoading && !alreadySetContainer) {
      if (pageId) {
        if (pageStatus === 'success') {
          dispatch(
            setContainerRedux(
              container || containerRedux,
              source,
              pageId,
              destructurePages
            )
          );
        }
      } else {
        dispatch(
          setContainerRedux(container || containerRedux, source, pageId)
        );
      }
    }
  }, [
    container,
    dispatch,
    isLoading,
    pageId,
    source,
    status,
    alreadySetContainer,
    containerRedux,
    pageStatus,
    destructurePages
  ]);

  React.useEffect(() => {
    if (!!containerRedux) {
      const redirectURL = containerRedux.source?.[source]?.[0]?.id;
      if (redirectURL && !pageId) {
        navigate(redirectURL);
      }
    }
  }, [containerRedux, navigate, source, pageId]);

  return {
    isFetching,
    error,
    isError
  };
}
