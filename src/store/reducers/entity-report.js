import React from 'react';
import {createSelector} from 'reselect';
import {useSelector} from 'react-redux';

import {createAction} from 'utils/helpers/createAction.helpers';
import {createReducer} from 'utils/helpers/createReducer.helpers';

//---> Define action types
const ACTION_PREFIX = '@entity_report';
const SET_TIME_RANGE = `${ACTION_PREFIX}/SET_TIME_RANGE`;
const SET_UNIT = `${ACTION_PREFIX}/SET_UNIT`;
const SET_METRIC_URL = `${ACTION_PREFIX}/SET_METRIC_URL`;

//---> Create actions
export const setTimeRangeRedux = timeRange =>
  createAction(SET_TIME_RANGE, {timeRange});
export const setUnitRedux = unit => createAction(SET_UNIT, {unit});
export const setMetricUrlRedux = url => createAction(SET_METRIC_URL, {url});

//---> Initializing states
const entityReportInitialState = {
  timeRange: '',
  unit: '',
  url: ''
};

//---> Action mapping
const handleActions = {
  [SET_TIME_RANGE]: handleSetTimeRange,
  [SET_UNIT]: handleSetUnit,
  [SET_METRIC_URL]: handleSetUrl
};

function handleSetTimeRange(state, action) {
  state.timeRange = action.payload.timeRange;
}

function handleSetUnit(state, action) {
  state.unit = action.payload.unit;
}

function handleSetUrl(state, action) {
  state.url = action.payload.url;
}

const makeSelectUrl = () =>
  createSelector(
    state => state.entityReportReducer,
    a => a.url
  );

//---> Hook to select state
export function useMetricUrlSelector() {
  const selectUrl = React.useMemo(makeSelectUrl, []);
  return useSelector(state => selectUrl(state));
}

export const entityReportReducer = (
  initialState = entityReportInitialState,
  action
) => createReducer(initialState, action, handleActions);
