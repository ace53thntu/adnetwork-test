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
const SET_METRIC_BODY = `${ACTION_PREFIX}/SET_METRIC_BODY`;
const SET_METRIC_DATA = `${ACTION_PREFIX}/SET_METRIC_DATA`;
const RESET = `${ACTION_PREFIX}/RESET`;

//---> Create actions
export const setTimeRangeRedux = timeRange =>
  createAction(SET_TIME_RANGE, {timeRange});
export const setUnitRedux = unit => createAction(SET_UNIT, {unit});
export const setMetricUrlRedux = url => createAction(SET_METRIC_URL, {url});
export const setMetricBodyRedux = bodyRequest =>
  createAction(SET_METRIC_BODY, {bodyRequest});

export const setMetricDataRedux = metricsData =>
  createAction(SET_METRIC_DATA, {metricsData});

export const resetReportRedux = () => createAction(RESET);

//---> Initializing states
const entityReportInitialState = {
  timeRange: '',
  unit: '',
  url: '',
  metricBodyRequest: {},
  metricsData: null
};

//---> Action mapping
const handleActions = {
  [SET_TIME_RANGE]: handleSetTimeRange,
  [SET_UNIT]: handleSetUnit,
  [SET_METRIC_URL]: handleSetUrl,
  [SET_METRIC_BODY]: handleSetMetricBody,
  [SET_METRIC_DATA]: handleSetMetricData,
  [RESET]: handleReset
};

function handleReset(state, action) {
  state.timeRange = '';
  state.unit = '';
  state.url = '';
  state.metricBodyRequest = {};
  state.metricsData = null;
}

function handleSetMetricData(state, action) {
  state.metricsData = action.payload.metricsData;
}

function handleSetMetricBody(state, action) {
  state.metricBodyRequest = action.payload.bodyRequest;
}

function handleSetTimeRange(state, action) {
  state.timeRange = action.payload.timeRange;
}

function handleSetUnit(state, action) {
  state.unit = action.payload.unit;
}

function handleSetUrl(state, action) {
  state.url = action.payload.url;
}

const makeSelectMetricsData = () =>
  createSelector(
    state => state.entityReportReducer,
    a => a.metricsData
  );

const makeSelectMetricBody = () =>
  createSelector(
    state => state.entityReportReducer,
    a => a.metricBodyRequest
  );

const makeSelectUrl = () =>
  createSelector(
    state => state.entityReportReducer,
    a => a.url
  );

//---> Hook to select state
export function useMetricsDataSelector() {
  const selectMetricsData = React.useMemo(makeSelectMetricsData, []);
  return useSelector(state => selectMetricsData(state));
}

export function useMetricsBodySelector() {
  const selectBody = React.useMemo(makeSelectMetricBody, []);
  return useSelector(state => selectBody(state));
}

export function useMetricUrlSelector() {
  const selectUrl = React.useMemo(makeSelectUrl, []);
  return useSelector(state => selectUrl(state));
}

export const entityReportReducer = (
  initialState = entityReportInitialState,
  action
) => createReducer(initialState, action, handleActions);
