import {createAction} from 'utils/helpers/createAction.helpers';
import {createReducer} from 'utils/helpers/createReducer.helpers';
import {CAMPAIGN_VIEWS} from 'pages/Campaign/constants';

const SELECT_ADVERTISER = '@campaign/SELECT_ADVERTISER';
const SELECT_CAMPAIGN = '@campaign/SELECT_CAMPAIGN';
const SELECT_STRATEGY = '@campaign/SELECT_STRATEGY';
const RELOAD_TREE = '@campaign/RELOAD_TREE';
const SET_VIEW = '@campaign/SET_VIEW';
const CREATE_ACTION = '@campaign/CREATE_ACTION';
const SELECT_ITEM = '@campaign/SELECT_ITEM';

export const CAMPAIGN_CREATE_ACTION = {
  advertiser: 'advertiser',
  campaign: 'campaign',
  strategy: 'strategy'
};

export const selectItem = id => createAction(SELECT_ITEM, {id});

export const selectAdvertiser = advertiserId =>
  createAction(SELECT_ADVERTISER, {advertiserId});

export const selectCampaign = campaignId =>
  createAction(SELECT_CAMPAIGN, {campaignId});

export const selectStrategy = strategyId =>
  createAction(SELECT_STRATEGY, {strategyId});

export const reloadTree = shouldReload =>
  createAction(RELOAD_TREE, {shouldReload});

export const setViewCampaign = view => createAction(SET_VIEW, {view});

export const orgCreateAction = action => createAction(CREATE_ACTION, {action});

const campInitialState = {
  selectedAdvertiser: null,
  selectedCampaign: null,
  selectedStrategy: null,
  shouldReloadTree: false,
  createAction: null,
  view: CAMPAIGN_VIEWS.advertiser,
  selectedId: null
};

const handleActions = {
  [SELECT_ADVERTISER]: handleSelectAdvertiser,
  [RELOAD_TREE]: handleReloadTree,
  [CREATE_ACTION]: handleCreateAction,
  [SET_VIEW]: handleSetView,
  [SELECT_CAMPAIGN]: handleSelectCampaign,
  [SELECT_STRATEGY]: handleSelectStragegy,
  [SELECT_ITEM]: handleSelectItem
};

function handleSelectItem(state, action) {
  state.selectedId = action.payload.id;
}

function handleSelectAdvertiser(state, action) {
  state.selectedAdvertiser = action.payload.advertiserId;
}

function handleSelectCampaign(state, action) {
  state.selectedCampaign = action.payload.campaignId;
}

function handleSelectStragegy(state, action) {
  state.selectedStrategy = action.payload.strategyId;
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

export const campReducer = (initialState = campInitialState, action) =>
  createReducer(initialState, action, handleActions);
