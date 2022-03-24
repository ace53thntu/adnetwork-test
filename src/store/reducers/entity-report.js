import React from 'react';
import {createSelector} from 'reselect';
import {useSelector} from 'react-redux';

import {createAction} from 'utils/helpers/createAction.helpers';
import {createReducer} from 'utils/helpers/createReducer.helpers';
import {ReportGroupTypes} from 'pages/entity-report/constants.js';

//---> Define action types
const ACTION_PREFIX = '@entity_report';
const SET_TIME_RANGE = `${ACTION_PREFIX}/SET_TIME_RANGE`;
const SET_UNIT = `${ACTION_PREFIX}/SET_UNIT`;
const SET_METRIC_URL = `${ACTION_PREFIX}/SET_METRIC_URL`;
const SET_METRIC_BODY = `${ACTION_PREFIX}/SET_METRIC_BODY`;
const SET_METRIC_DATA = `${ACTION_PREFIX}/SET_METRIC_DATA`;
const SET_ACTIVE_REPORT_GROUP_TYPE = `${ACTION_PREFIX}/SET_ACTIVE_REPORT_GROUP_TYPE`;
const SET_CHART_TYPE_SELECTED = `${ACTION_PREFIX}/SET_CHART_TYPE_SELECTED`;
const RESET = `${ACTION_PREFIX}/RESET`;

//---> Create actions
export const setChartTypeSelectedRedux = chartType =>
  createAction(SET_CHART_TYPE_SELECTED, {chartType});
export const setReportGroupRedux = reportGroupType =>
  createAction(SET_ACTIVE_REPORT_GROUP_TYPE, {reportGroupType});
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
  metricsData: null,
  reportGroupType: ReportGroupTypes.ADVERTISER,
  chartTypeSelected: ''
};

//---> Action mapping
const handleActions = {
  [SET_CHART_TYPE_SELECTED]: handleSetChartTypeSelected,
  [SET_ACTIVE_REPORT_GROUP_TYPE]: handleSetReportGroupType,
  [SET_TIME_RANGE]: handleSetTimeRange,
  [SET_UNIT]: handleSetUnit,
  [SET_METRIC_URL]: handleSetUrl,
  [SET_METRIC_BODY]: handleSetMetricBody,
  [SET_METRIC_DATA]: handleSetMetricData,
  [RESET]: handleReset
};

function handleReset(state, action) {
  state = entityReportInitialState;
}

function handleSetChartTypeSelected(state, action) {
  state.chartTypeSelected = action.payload.chartType;
}

function handleSetReportGroupType(state, action) {
  state.reportGroupType = action.payload.reportGroupType;
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

const makeSelectReportGroupType = () =>
  createSelector(
    state => state.entityReportReducer,
    a => a.reportGroupType
  );

const makeSelectChartTypeSelected = () =>
  createSelector(
    state => state.entityReportReducer,
    a => a.chartTypeSelected
  );

//---> Hook to select state
export function useChartTypeSelectedSelector() {
  const selectChartTypeSelected = React.useMemo(
    makeSelectChartTypeSelected,
    []
  );
  return useSelector(state => selectChartTypeSelected(state));
}

export function useReportGroupTypeSelector() {
  const selectReportGroupType = React.useMemo(makeSelectReportGroupType, []);
  return useSelector(state => selectReportGroupType(state));
}

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
