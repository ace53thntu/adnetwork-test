import React, {useCallback} from 'react';

/** dispatch actions */
import * as containerActions from './actions';
/** context */
import {ContainerStateContext, ContainerDispatchContext} from './context';

function useContainerState() {
  const context = React.useContext(ContainerStateContext);
  if (context === undefined) {
    throw new Error(
      'useContainerState must be used within a ContainerProvider'
    );
  }
  return context;
}

function useContainerDispatch() {
  const context = React.useContext(ContainerDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useContainerDispatch must be used within a ContainerProvider'
    );
  }
  return context;
}

function useContainerStore() {
  const containerState = useContainerState();
  const dispatch = useContainerDispatch();

  const selectContainer = useCallback(
    container => {
      dispatch(containerActions.selectContainer(container));
    },
    [dispatch]
  );

  const selectPage = useCallback(
    page => {
      dispatch(containerActions.selectPage(page));
    },
    [dispatch]
  );

  const selectTag = useCallback(
    tag => {
      dispatch(containerActions.selectTag(tag));
    },
    [dispatch]
  );

  const resetState = useCallback(() => {
    dispatch(containerActions.resetState());
  }, [dispatch]);

  const deletePage = useCallback(() => {
    dispatch(containerActions.deletePage());
  }, [dispatch]);

  const createPage = useCallback(() => {
    dispatch(containerActions.createPage());
  }, [dispatch]);

  const updateContainer = useCallback(() => {
    dispatch(containerActions.updateContainer());
  }, [dispatch]);

  const treeLoaded = useCallback(() => {
    dispatch(containerActions.treeLoaded());
  }, [dispatch]);

  const setPages = useCallback(
    pages => {
      dispatch(containerActions.setPages(pages));
    },
    [dispatch]
  );

  const setSource = useCallback(
    source => {
      dispatch(containerActions.setSource(source));
    },
    [dispatch]
  );

  const treeReload = useCallback(
    source => {
      dispatch(containerActions.treeReload());
    },
    [dispatch]
  );

  const lockTree = useCallback(
    source => {
      dispatch(containerActions.lockTree());
    },
    [dispatch]
  );

  const unlockTree = useCallback(
    source => {
      dispatch(containerActions.unlockTree());
    },
    [dispatch]
  );

  return {
    state: containerState,
    dispatch,
    selectPage,
    selectContainer,
    selectTag,
    resetState,
    deletePage,
    createPage,
    treeLoaded,
    setPages,
    setSource,
    updateContainer,
    treeReload,
    lockTree,
    unlockTree
  };
}

export {useContainerStore, useContainerState, useContainerDispatch};
