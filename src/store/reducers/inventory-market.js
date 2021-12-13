import {createSelector} from 'reselect';
import {useSelector} from 'react-redux';

import {createAction} from 'utils/helpers/createAction.helpers';
import {createReducer} from 'utils/helpers/createReducer.helpers';
import React from 'react';

export const InitParamFilter = {
  format: null,
  type: null,
  floor_price: '',
  deal_price: '',
  fill_rate: '',
  click_rate: '',
  search: ''
};

//---> Define action types
const ACTION_PREFIX = '@inventory_market';
const SET_SEARCH_TYPE = `${ACTION_PREFIX}/SET_SEARCH_TYPE`;
const SET_FILTER_PARAMS = `${ACTION_PREFIX}/SET_FILTER_PARAMS`;

//---> Create actions
export const setSearchTypeRedux = searchType =>
  createAction(SET_SEARCH_TYPE, {searchType});

export const setFilterParamsRedux = filterParams =>
  createAction(SET_FILTER_PARAMS, {filterParams});

//---> Initializing states
const inventoryMarketInitialState = {
  searchType: '',
  filterParams: InitParamFilter
};

//---> Action mapping
const handleActions = {
  [SET_SEARCH_TYPE]: handleSetSearchType,
  [SET_FILTER_PARAMS]: handleSetFilterParams
};

function handleSetSearchType(state, action) {
  state.searchType = action.payload.searchType;
  state.filterParams = InitParamFilter;
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

//---> Hook to select state
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
