import {
  setContainerRedux,
  useContainerSelector
} from 'store/reducers/container';
import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router';

import {useGetContainer} from './useContainer';

export function useRedirectInContainer() {
  const {containerId, source, pageId} = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isLoading,
    container: containerRedux,
    alreadySetContainer
  } = useContainerSelector();

  const enabled = containerRedux?.id !== containerId;

  const {data: container, isFetching, status, isError, error} = useGetContainer(
    {
      containerId,
      enabled
    }
  );

  React.useEffect(() => {
    if (status === 'success' && !isLoading && !alreadySetContainer) {
      dispatch(setContainerRedux(container || containerRedux, source, pageId));
    }
  }, [
    container,
    dispatch,
    enabled,
    isLoading,
    pageId,
    source,
    status,
    alreadySetContainer,
    containerRedux
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
