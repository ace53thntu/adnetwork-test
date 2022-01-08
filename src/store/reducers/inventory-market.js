import React from 'react';

import {createSelector} from 'reselect';
import {useSelector} from 'react-redux';

import {createAction} from 'utils/helpers/createAction.helpers';
import {createReducer} from 'utils/helpers/createReducer.helpers';
import {FilterMode} from 'constants/inventory-market';

export const InitFilterParams = {
  format: null,
  type: null,
  floor_price: '',
  deal_price: '',
  fill_rate: '',
  click_rate: '',
  search: '',
  market_type: ''
};

//---> Define action types
const ACTION_PREFIX = '@inventory_market';
const SET_SEARCH_TYPE = `${ACTION_PREFIX}/SET_SEARCH_TYPE`;
const SET_FILTER_PARAMS = `${ACTION_PREFIX}/SET_FILTER_PARAMS`;
const SET_FILTER_MODE = `${ACTION_PREFIX}/SET_FILTER_MODE`;
const RESET_FILTER = `${ACTION_PREFIX}/RESET_FILTER`;

//---> Create actions
export const setSearchTypeRedux = searchType =>
  createAction(SET_SEARCH_TYPE, {searchType});

export const setFilterParamsRedux = filterParams =>
  createAction(SET_FILTER_PARAMS, {filterParams});

export const resetFilterParamsRedux = () => createAction(RESET_FILTER);
export const setFilterModeRedux = filterMode =>
  createAction(SET_FILTER_MODE, {filterMode});

//---> Initializing states
const inventoryMarketInitialState = {
  searchType: '',
  filterParams: InitFilterParams,
  filterMode: FilterMode.MARKET
};

//---> Action mapping
const handleActions = {
  [SET_SEARCH_TYPE]: handleSetSearchType,
  [SET_FILTER_PARAMS]: handleSetFilterParams,
  [RESET_FILTER]: handleResetFilter,
  [SET_FILTER_MODE]: handleSetFilterMode
};

function handleSetFilterMode(state, action) {
  const {filterMode} = action.payload;
  state.filterMode = filterMode;
  state.searchType = '';
  if (filterMode === FilterMode.BID) {
    state.filterParams = {
      ...InitFilterParams,
      has_active_bid: true
    };
  }

  if (filterMode === FilterMode.DEAL) {
    state.filterParams = {
      ...InitFilterParams,
      has_active_deal: true
    };
  }
}

function handleResetFilter(state, action) {
  state.searchType = '';
  state.filterParams = InitFilterParams;
  state.filterMode = FilterMode.MARKET;
}

function handleSetSearchType(state, action) {
  state.searchType = action.payload.searchType;
  if (state.filterMode === FilterMode.BID) {
    state.filterParams = {...InitFilterParams, has_active_bid: true};
  } else if (state.filterMode === FilterMode.DEAL) {
    state.filterParams = {...InitFilterParams, has_active_deal: true};
  } else {
    state.filterParams = InitFilterParams;
  }
}

function handleSetFilterParams(state, action) {
  state.filterParams = action.payload.filterParams;
}

const makeSelectSearchType = () =>
  createSelector(
    state => state.inventoryMarketReducer,
    a => a.searchType
  );

const makeSelectFilterParams = () =>
  createSelector(
    state => state.inventoryMarketReducer,
    a => a.filterParams
  );

const makeSelectFilterMode = () =>
  createSelector(
    state => state.inventoryMarketReducer,
    a => a.filterMode
  );

//---> Hook to select state
export function useFilterModeSelector() {
  const selectFilterMode = React.useMemo(makeSelectFilterMode, []);
  return useSelector(state => selectFilterMode(state));
}
export function useFilterParamsSelector() {
  const selectFilterParams = React.useMemo(makeSelectFilterParams, []);
  return useSelector(state => selectFilterParams(state));
}
export function useSearchTypeSelector() {
  const selectSearchType = React.useMemo(makeSelectSearchType, []);
  return useSelector(state => selectSearchType(state));
}

export const inventoryMarketReducer = (
  initialState = inventoryMarketInitialState,
  action
) => createReducer(initialState, action, handleActions);
