import {createAction} from 'utils/helpers/createAction.helpers';
import * as actionTypes from './actionTypes';

/**
 * Dispatch when user click a container on tree
 */
export const selectContainer = container =>
  createAction(actionTypes.SELECT_CONTAINER, {container});

/**
 * Dispatch when user click a page of container on tree
 */
export const selectPage = page => createAction(actionTypes.SELECT_PAGE, {page});

/**
 * Dispatch when user click tree item level 2
 */
export const selectTag = tag => createAction(actionTypes.SELECT_TAG, {tag});

// reset
export const resetState = () => createAction(actionTypes.RESET);
export const treeLoaded = () => createAction(actionTypes.TREE_LOADED);
export const treeReload = () => createAction(actionTypes.TREE_RELOAD);
export const lockTree = () => createAction(actionTypes.LOCK_TREE);
export const unlockTree = () => createAction(actionTypes.UNLOCK_TREE);

// delete page
export const deletePage = () => createAction(actionTypes.DELETE_PAGE);
export const createPage = () => createAction(actionTypes.CREATE_PAGE);
export const setPages = pages => createAction(actionTypes.SET_PAGES, {pages});
export const setSource = source =>
  createAction(actionTypes.SET_SOURCE, {source});
export const updateContainer = () => createAction(actionTypes.UPDATE_CONTAINER);
