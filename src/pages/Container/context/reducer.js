import {createReducer} from 'utils/helpers/createReducer.helpers';
import * as actionTypes from './actionTypes';

const containerInitialState = {
  selectedPage: null,
  selectedContainer: null,
  selectedTag: null,
  source: '',
  shouldReload: false,
  locked: false,
  pages: [],
  container: null
};

const handleActions = {
  [actionTypes.SELECT_PAGE]: selectPage,
  [actionTypes.SELECT_CONTAINER]: selectContainer,
  [actionTypes.SELECT_TAG]: selectTag,

  [actionTypes.RESET]: resetState,
  [actionTypes.TREE_RELOAD]: reloadTree,
  [actionTypes.LOCK_TREE]: lockTree,
  [actionTypes.UNLOCK_TREE]: unlockTree,

  [actionTypes.DELETE_PAGE]: deletePage,
  [actionTypes.CREATE_PAGE]: createPage,
  [actionTypes.TREE_LOADED]: treeLoaded,
  [actionTypes.SET_PAGES]: setPages,
  [actionTypes.SET_SOURCE]: setSource,
  [actionTypes.UPDATE_CONTAINER]: updateContainer
};

function reloadTree(state, {payload}) {
  state.shouldReload = true;
}

function lockTree(state, {payload}) {
  state.locked = true;
}

function unlockTree(state, {payload}) {
  state.locked = false;
}

function selectPage(state, {payload}) {
  state.selectedPage = payload.page;
}

function selectContainer(state, {payload}) {
  state.selectedContainer = payload.container;
}

function selectTag(state, {payload}) {
  state.selectedTag = payload.tag;
}

function resetState(state, {payload}) {
  state.selectedTag = null;
  state.selectedPage = null;
  state.selectedContainer = null;
}

function deletePage(state, {payload}) {
  state.selectedPage = null;
  state.shouldReload = true;
}

function createPage(state, {payload}) {
  state.shouldReload = true;
}

function updateContainer(state, {payload}) {
  state.shouldReload = true;
}

function treeLoaded(state, {payload}) {
  state.shouldReload = false;
}

function setPages(state, {payload}) {
  state.pages = payload.pages;
}

function setSource(state, {payload}) {
  state.source = payload.source;
}

const containerReducer = (initialState = containerInitialState, action) =>
  createReducer(initialState, action, handleActions);

export {containerReducer, containerInitialState};
