import {createAction} from 'utils/helpers/createAction.helpers';
import {createReducer} from 'utils/helpers/createReducer.helpers';

const SELECT_CONTAINER = '@container/SELECT_CONTAINER';
const SELECT_PAGE = '@container/SELECT_PAGE';
const SELECT_INVENTORY = '@container/SELECT_INVENTORY';
const RELOAD_TREE = '@container/RELOAD_TREE';
const SET_VIEW = '@container/SET_VIEW';
const CREATE_ACTION = '@container/CREATE_ACTION';
const SELECT_ITEM = '@container/SELECT_ITEM';

export const CONTAINER_VIEWS = {
  container: 'container',
  contaienrDetail: 'contaienrDetail',
  pageDetail: 'pageDetail',
  inventoryDetail: 'inventoryDetail'
};

export const CONTAINER_CREATE_ACTION = {
  container: 'container',
  page: 'page',
  inventory: 'inventory'
};

export const selectItem = id => createAction(SELECT_ITEM, {id});

export const selectContainer = containerId =>
  createAction(SELECT_CONTAINER, {containerId});

export const selectPage = pageId => createAction(SELECT_PAGE, {pageId});

export const selectInventory = inventoryId =>
  createAction(SELECT_INVENTORY, {inventoryId});

export const reloadTree = shouldReload =>
  createAction(RELOAD_TREE, {shouldReload});

export const setViewContainer = view => createAction(SET_VIEW, {view});

export const containerCreateAction = action =>
  createAction(CREATE_ACTION, {action});

const containerInitialState = {
  selectedContainer: null,
  selectedPage: null,
  selectedInventory: null,
  shouldReloadTree: false,
  createAction: null,
  view: CONTAINER_VIEWS.container,
  selectedId: null
};

const handleActions = {
  [SELECT_CONTAINER]: handleSelectContainer,
  [RELOAD_TREE]: handleReloadTree,
  [CREATE_ACTION]: handleCreateAction,
  [SET_VIEW]: handleSetView,
  [SELECT_PAGE]: handleSelectPage,
  [SELECT_INVENTORY]: handleSelectInventory,
  [SELECT_ITEM]: handleSelectItem
};

function handleSelectItem(state, action) {
  state.selectedId = action.payload.id;
}

function handleSelectContainer(state, action) {
  state.selectedContainer = action.payload.containerId;
}

function handleSelectPage(state, action) {
  state.selectedPage = action.payload.pageId;
}

function handleSelectInventory(state, action) {
  state.selectedInventory = action.payload.inventoryId;
}

function handleReloadTree(state, action) {
  state.shouldReloadTree = action.payload.shouldReload;
}

function handleCreateAction(state, action) {
  state.createAction = action.payload.action;
}

function handleSetView(state, action) {
  state.view = action.payload.view;
}

export const containerReducer = (
  initialState = containerInitialState,
  action
) => createReducer(initialState, action, handleActions);
