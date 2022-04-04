import React from 'react';

import {createSelector} from 'reselect';
import {useSelector} from 'react-redux';

import {createAction} from 'utils/helpers/createAction.helpers';
import {createReducer} from 'utils/helpers/createReducer.helpers';

//---> Define action types
const ACTION_PREFIX = '@publisher';
const SET_SEARCH_TERM = `${ACTION_PREFIX}/SET_SEARCH_TERM`;
const RESET = `${ACTION_PREFIX}/RESET`;

//---> Create actions
export const setSearchTermRedux = searchTerm =>
  createAction(SET_SEARCH_TERM, {searchTerm});

export const resetParamsRedux = () => createAction(RESET);

//---> Initializing states
const publisherInitialState = {
  searchTerm: ''
};

//---> Action mapping
const handleActions = {
  [SET_SEARCH_TERM]: handleSetSearchTerm,
  [RESET]: handleReset
};

function handleSetSearchTerm(state, action) {
  const {searchTerm} = action.payload;
  state.searchTerm = searchTerm;
}

function handleReset(state, action) {
  state = publisherInitialState;
}

const makeSelectSearchTerm = () =>
  createSelector(
    state => state.publisherReducer,
    a => a.searchTerm
  );

//---> Hook to select state
export function useSearchTermSelector() {
  const selectSearchTerm = React.useMemo(makeSelectSearchTerm, []);
  return useSelector(state => selectSearchTerm(state));
}

export const publisherReducer = (
  initialState = publisherInitialState,
  action
) => createReducer(initialState, action, handleActions);
