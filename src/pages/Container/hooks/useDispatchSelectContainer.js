import {
  selectContainerRedux,
  useContainerSelector
} from 'store/reducers/container';
import React from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router';
import {useGetContainer} from 'queries/container';

export function useDispatchSelectContainer() {
  const {cid: containerId} = useParams();
  const dispatch = useDispatch();
  const {isLoading, selectedContainerId} = useContainerSelector();

  const {
    data: container,
    isFetching,
    isError,
    error,
    isFetched
  } = useGetContainer({containerId, enabled: !!containerId});

  React.useEffect(() => {
    if (
      !isLoading &&
      selectedContainerId !== containerId &&
      !isFetching &&
      !isError
    ) {
      dispatch(selectContainerRedux(containerId, container));
    }
  }, [
    container,
    containerId,
    dispatch,
    isLoading,
    selectedContainerId,
    isFetching,
    isError
  ]);

  return {
    isFetching,
    container,
    isError,
    error,
    isFetched
  };
}
