import React from 'react';
import {createSelector} from 'reselect';
import {useSelector} from 'react-redux';

import {createAction} from 'utils/helpers/createAction.helpers';
import {createReducer} from 'utils/helpers/createReducer.helpers';
import {ReportGroupTypes} from 'pages/entity-report/constants.js';
import {ChartModes} from 'constants/report';

//---> Define action types
const ACTION_PREFIX = '@entity_report';
const SET_COLORS_SELECTED = `${ACTION_PREFIX}/SET_COLORS_SELECTED`;
const SET_TIME_RANGE = `${ACTION_PREFIX}/SET_TIME_RANGE`;
const SET_METRIC_URL = `${ACTION_PREFIX}/SET_METRIC_URL`;
const SET_METRIC_BODY = `${ACTION_PREFIX}/SET_METRIC_BODY`;
const SET_METRIC_DATA = `${ACTION_PREFIX}/SET_METRIC_DATA`;
const SET_ACTIVE_REPORT_GROUP_TYPE = `${ACTION_PREFIX}/SET_ACTIVE_REPORT_GROUP_TYPE`;
const SET_CHART_TYPE_SELECTED = `${ACTION_PREFIX}/SET_CHART_TYPE_SELECTED`;
const SET_IS_CHART_COMPARE = `${ACTION_PREFIX}/SET_IS_CHART_COMPARE`;
const SET_CHART_MODE = `${ACTION_PREFIX}/SET_CHART_MODE`;
const SET_METRICSET_SELECTED = `${ACTION_PREFIX}/SET_METRICSET_SELECTED`;
const SET_ENTITY_NAME = `${ACTION_PREFIX}/SET_ENTITY_NAME`;
const SET_PARENT_PATH = `${ACTION_PREFIX}/SET_PARENT_PATH`;
const SET_TIME_UNIT_SELECTED = `${ACTION_PREFIX}/SET_TIME_UNIT_SELECTED`;
const SET_DEFAULT_TIMEZONE = `${ACTION_PREFIX}/SET_DEFAULT_TIMEZONE`;
const RESET = `${ACTION_PREFIX}/RESET`;

//---> Create actions
export const setDefaultTimeZoneRedux = timezone =>
  createAction(SET_DEFAULT_TIMEZONE, {timezone});
export const setTimeUnitSelectRedux = timeUnit =>
  createAction(SET_TIME_UNIT_SELECTED, {timeUnit});
export const setParentPathRedux = parentPath =>
  createAction(SET_PARENT_PATH, {parentPath});
export const setEntityNameRedux = entityName =>
  createAction(SET_ENTITY_NAME, {entityName});
export const setChartColorSelectedRedux = colorsSelected =>
  createAction(SET_COLORS_SELECTED, {colorsSelected});
export const setMetricSetSelectedRedux = metricsetsSelected =>
  createAction(SET_METRICSET_SELECTED, {metricsetsSelected});
export const setChartModeRedux = chartMode =>
  createAction(SET_CHART_MODE, {chartMode});
export const setIsCompareChartRedux = isCompare =>
  createAction(SET_IS_CHART_COMPARE, {isCompare});
export const setChartTypeSelectedRedux = chartType =>
  createAction(SET_CHART_TYPE_SELECTED, {chartType});
export const setReportGroupRedux = reportGroupType =>
  createAction(SET_ACTIVE_REPORT_GROUP_TYPE, {reportGroupType});
export const setTimeRangeRedux = timeRange =>
  createAction(SET_TIME_RANGE, {timeRange});
export const setMetricUrlRedux = url => createAction(SET_METRIC_URL, {url});
export const setMetricBodyRedux = bodyRequest =>
  createAction(SET_METRIC_BODY, {bodyRequest});

export const setMetricDataRedux = metricsData =>
  createAction(SET_METRIC_DATA, {metricsData});

export const resetReportRedux = () => createAction(RESET);

//---> Initializing states
const entityReportInitialState = {
  timeRange: '',
  time_unit: '',
  url: '',
  metricBodyRequest: {},
  metricsData: null,
  reportGroupType: ReportGroupTypes.ADVERTISER,
  chartTypeSelected: '',
  isChartCompare: false,
  chartMode: ChartModes.BY,
  metricsetsSelected: [],
  colorsSelected: [],
  entityName: '',
  parentPath: '',
  defaultTimezone: ''
};

//---> Action mapping
const handleActions = {
  [SET_DEFAULT_TIMEZONE]: handleSetDefaultTimezone,
  [SET_ENTITY_NAME]: handleSetEntityName,
  [SET_PARENT_PATH]: handleSetParentPath,
  [SET_COLORS_SELECTED]: handleSetColorsSelected,
  [SET_METRICSET_SELECTED]: handleSetMetricsetSelected,
  [SET_CHART_MODE]: handleSetChartMode,
  [SET_IS_CHART_COMPARE]: handleSetIsChartCompare,
  [SET_CHART_TYPE_SELECTED]: handleSetChartTypeSelected,
  [SET_ACTIVE_REPORT_GROUP_TYPE]: handleSetReportGroupType,
  [SET_TIME_RANGE]: handleSetTimeRange,
  [SET_TIME_UNIT_SELECTED]: handleSetTimeUnit,
  [SET_METRIC_URL]: handleSetUrl,
  [SET_METRIC_BODY]: handleSetMetricBody,
  [SET_METRIC_DATA]: handleSetMetricData,
  [RESET]: handleReset
};

function handleReset(state, action) {
  state = entityReportInitialState;
}

function handleSetDefaultTimezone(state, action) {
  state.defaultTimezone = action.payload.timezone;
}

function handleSetParentPath(state, action) {
  state.parentPath = action.payload?.parentPath;
}

function handleSetEntityName(state, action) {
  state.entityName = action.payload?.entityName;
}

function handleSetColorsSelected(state, action) {
  state.colorsSelected = action.payload.colorsSelected;
}

function handleSetMetricsetSelected(state, action) {
  state.metricsetsSelected = action.payload.metricsetsSelected;
}

function handleSetChartMode(state, action) {
  state.chartMode = action.payload.chartMode;
}

function handleSetIsChartCompare(state, action) {
  state.isChartCompare = action.payload.isCompare;
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
  state.time_unit = action.payload.bodyRequest?.time_unit;
}

function handleSetTimeRange(state, action) {
  state.timeRange = action.payload.timeRange;
}

function handleSetTimeUnit(state, action) {
  state.time_unit = action.payload.time_unit;
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

const makeSelectIsChartCompare = () =>
  createSelector(
    state => state.entityReportReducer,
    a => a.isChartCompare
  );

const makeSelectChartMode = () =>
  createSelector(
    state => state.entityReportReducer,
    a => a.chartMode
  );

const makeSelectMetricsetSelected = () =>
  createSelector(
    state => state.entityReportReducer,
    a => a.metricsetsSelected
  );

const makeSelectColorsSelected = () =>
  createSelector(
    state => state.entityReportReducer,
    a => a.colorsSelected
  );

const makeSelectEntityName = () =>
  createSelector(
    state => state.entityReportReducer,
    a => a.entityName
  );

const makeSelectParentPath = () =>
  createSelector(
    state => state.entityReportReducer,
    a => a.parentPath
  );

const makeSelectTimeUnit = () =>
  createSelector(
    state => state.entityReportReducer,
    a => a.time_unit
  );

const makeSelectDefaultTimezone = () =>
  createSelector(
    state => state.entityReportReducer,
    a => a.defaultTimezone
  );

//---> Hook to select state
export function useDefaultTimezoneSelector() {
  const selectDefaultTimezone = React.useMemo(makeSelectDefaultTimezone, []);
  return useSelector(state => selectDefaultTimezone(state));
}

export function useTimeUnitSelector() {
  const selectTimeUnit = React.useMemo(makeSelectTimeUnit, []);
  return useSelector(state => selectTimeUnit(state));
}

export function useParentPathSelector() {
  const parentPath = React.useMemo(makeSelectParentPath, []);
  return useSelector(state => parentPath(state));
}

export function useEntityNameSelector() {
  const entityName = React.useMemo(makeSelectEntityName, []);
  return useSelector(state => entityName(state));
}

export function useColorsSelectedSelector() {
  const selectColorsSelected = React.useMemo(makeSelectColorsSelected, []);
  return useSelector(state => selectColorsSelected(state));
}

export function useMetricsetSelectedSelector() {
  const selectMetricSet = React.useMemo(makeSelectMetricsetSelected, []);
  return useSelector(state => selectMetricSet(state));
}

export function useChartModeSelector() {
  const selectChartMode = React.useMemo(makeSelectChartMode, []);
  return useSelector(state => selectChartMode(state));
}

export function useIsChartCompareSelector() {
  const selectIsChartCompare = React.useMemo(makeSelectIsChartCompare, []);
  return useSelector(state => selectIsChartCompare(state));
}

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
