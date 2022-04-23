//---> Build-in Modules
import React from 'react';

//---> External Modules
import BlockUi from 'react-block-ui';
import {FormProvider, useForm, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {
  Button,
  Col,
  Label,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap';

//---> Internal Modules
import {
  setChartTypeSelectedRedux,
  setIsCompareChartRedux,
  setMetricBodyRedux,
  useMetricsBodySelector,
  useMetricsetSelectedSelector,
  setChartColorSelectedRedux,
  useColorsSelectedSelector
} from 'store/reducers/entity-report';
import {getReportSources} from 'utils/metrics';
import ChartPreview from './ChartPreview';
import ConfigChart from './form/ChartConfig/ConfigChart';
import TimeUnit from './form/TimeUnit';
import ReportByGroup from './form/ReportByGroup/ReportByGroup';
import ReportSourceSelect from './form/ReportSourceSelect';
import ReportTypeSelect from './form/ReportTypeSelect';
import {EndTime} from './form/TimePeriod/EndTime';
import StartTime from './form/TimePeriod/StartTime';
import TimeRange from './form/TimeRange';
import {schemaValidate} from './form/validation';
import {useDefaultValues} from 'pages/entity-report/hooks';
import {getMetricRequestBody} from 'pages/entity-report/utils/metricRequest';
import {getReportById} from 'pages/entity-report/utils/getReportById';
import {
  ChartModes,
  ChartTypes,
  ReportTypes,
  REPORT_INPUT_NAME,
  TimeUnits
} from 'constants/report';
import DistributionUnit from './form/DistributionUnit';
import ChartMode from './form/ChartConfig/ChartMode';
import {getParsedTimeUnit} from '../utils/getParsedTimeUnit';
import DropdownChartType from './form/ChartConfig/DropdownChartType';
import {getParsedTimeRange} from '../utils/getParsedTimeRange';
import moment from 'moment';
import ReportName from './report-item/ReportName';

export default function ReportFormContent({
  initializeDefaultValue,
  report,
  onSubmit,
  toggle,
  isViewed,
  isEdit = false,
  reportSource,
  metricSet,
  unit,
  timeRange,
  entityId
}) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const currentReport = useDefaultValues({report});

  const defaultValues = isEdit ? currentReport : initializeDefaultValue;
  const reportSourceOptions = getReportSources();

  const parentPath = report?.properties?.parentPath || '';
  const name = report?.name || '';

  // Selectors
  const metricBody = useMetricsBodySelector();
  const metricateSelected = useMetricsetSelectedSelector();
  const colorsRedux = useColorsSelectedSelector();
  console.log(
    '🚀 ~ file: ReportFormContent.js ~ line 81 ~ colorsRedux',
    colorsRedux
  );

  // const chartTypeSelectedRedux = useChartTypeSelectedSelector();
  const reportByUuid = getReportById({report, entityId});

  const methods = useForm({
    defaultValues,
    resolver: schemaValidate(t)
  });
  const {handleSubmit, formState, control, setValue, watch} = methods;
  const requestBody = report ? getMetricRequestBody({report}) : null;
  const reportId = report?.uuid;

  // Watch form value changed'
  const reportType = useWatch({name: REPORT_INPUT_NAME.REPORT_TYPE, control});
  const timeRangeSelected = useWatch({
    name: `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.TIME_RANGE}`,
    control
  });
  const startTimeSelected = useWatch({
    name: `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.START_TIME}`,
    control
  });
  const endTimeSelected = useWatch({
    name: `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.END_TIME}`,
    control
  });
  const reportBySelected = useWatch({
    name: `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.REPORT_BY}`,
    control
  });
  const reportByUuidSelected = watch(
    `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.REPORT_BY_UUID}`
  );
  console.log(
    '🚀 ~ file: ReportFormContent.js ~ line 111 ~ reportByUuidSelected',
    reportByUuidSelected
  );

  const timeUnitSelected = useWatch({
    name: `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.UNIT}`,
    control
  });
  console.log(
    '🚀 ~ file: ReportFormContent.js ~ line 117 ~ timeUnitSelected',
    timeUnitSelected
  );
  const chartTypeSelected = useWatch({
    name: `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.CHART_TYPE}`,
    control
  });

  const isChartCompare =
    !reportByUuidSelected &&
    reportBySelected?.value !== 'source' &&
    reportSource !== reportBySelected?.value;

  const handleSelectedChartType = React.useCallback(
    _chartType => {
      setValue(
        `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.CHART_TYPE}`,
        _chartType
      );
      dispatch(setChartTypeSelectedRedux(_chartType));
    },
    [dispatch, setValue]
  );

  const handleSelectedColor = React.useCallback(
    (index, _color) => {
      const listColors = colorsRedux.map((item, idx) => {
        if (idx === index) {
          return _color?.hex;
        }

        return item;
      });
      dispatch(setChartColorSelectedRedux(listColors));
    },
    [colorsRedux, dispatch]
  );

  React.useEffect(() => {
    dispatch(setIsCompareChartRedux(isChartCompare));
  }, [dispatch, isChartCompare]);

  React.useEffect(() => {
    if ((isEdit || isViewed) && Object.keys(metricBody).length === 0) {
      dispatch(setMetricBodyRedux(requestBody));
    }
  }, [requestBody, isEdit, isViewed, dispatch, metricBody]);

  //---> Handle report by change
  React.useEffect(
    function handleReportByChange() {
      if (metricBody.report_by !== reportBySelected?.value) {
        dispatch(
          setMetricBodyRedux({
            ...metricBody,
            report_by: reportBySelected?.value,
            report_by_uuid: '',
            time_unit: TimeUnits.GLOBAL
          })
        );
        setValue(
          `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.TIME_UNIT}`,
          JSON.stringify({value: 'global', label: 'Global'})
        );
      }
    },
    [dispatch, metricBody, reportBySelected?.value, setValue]
  );

  //---> Handle report by uuid change
  React.useEffect(
    function handleReportByUuidChange() {
      if (
        reportByUuidSelected &&
        metricBody.report_by_uuid !== reportByUuidSelected?.value
      ) {
        const parsedTimeUnit = getParsedTimeUnit({timeUnit: timeUnitSelected});
        const parsedTimeRange = getParsedTimeRange({
          timeRange: timeRangeSelected
        });
        let timeUnit = parsedTimeUnit;
        if (parsedTimeUnit === TimeUnits.GLOBAL) {
          setValue(
            `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.UNIT}`,
            JSON.stringify(parsedTimeRange?.units?.[0]),
            {
              shouldValidate: true,
              shouldDirty: true
            }
          );
          timeUnit = parsedTimeRange?.units?.[0]?.value;
        }

        dispatch(
          setMetricBodyRedux({
            ...metricBody,
            report_by: reportBySelected?.value,
            report_by_uuid: reportByUuidSelected?.value,
            time_unit: timeUnit
          })
        );
        if (chartTypeSelected !== ChartTypes.LINE) {
          setValue(
            `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.CHART_TYPE}`,
            ChartTypes.LINE
          );
          dispatch(setChartTypeSelectedRedux(ChartTypes.LINE));
        }
      }

      if (!reportByUuidSelected && isChartCompare) {
        if (
          chartTypeSelected !== ChartTypes.PIE &&
          chartTypeSelected !== ChartTypes.BAR
        ) {
          setValue(
            `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.CHART_TYPE}`,
            ChartTypes.PIE
          );
          dispatch(setChartTypeSelectedRedux(ChartTypes.PIE));
        }
      }
    },
    [
      chartTypeSelected,
      dispatch,
      isChartCompare,
      metricBody,
      reportBySelected?.value,
      reportByUuidSelected,
      setValue,
      timeRangeSelected,
      timeUnitSelected
    ]
  );

  //---> Handle chart type change
  React.useEffect(
    function handleChartTypeChange() {
      dispatch(setChartTypeSelectedRedux(chartTypeSelected));
    },
    [chartTypeSelected, dispatch]
  );

  //---> Handle trending - unit global
  React.useEffect(
    function initChartTypeWithGlobalTimeRange() {
      if (
        isChartCompare &&
        ![ChartTypes.BAR, ChartTypes.PIE].includes(chartTypeSelected) &&
        metricBody.time_unit !== TimeUnits.GLOBAL &&
        metricateSelected?.length < 2
      ) {
        if (
          chartTypeSelected !== ChartTypes.PIE &&
          chartTypeSelected !== ChartTypes.BAR
        ) {
          setValue(
            `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.CHART_TYPE}`,
            ChartTypes.PIE
          );
          dispatch(setChartTypeSelectedRedux(ChartTypes.PIE));
        }
        dispatch(
          setMetricBodyRedux({
            ...metricBody,
            time_unit: TimeUnits.GLOBAL
          })
        );
      }
    },
    [
      chartTypeSelected,
      dispatch,
      isChartCompare,
      metricBody,
      metricateSelected?.length,
      setValue
    ]
  );

  //---> Handle start time, end time with distribution report
  React.useEffect(
    function handleStartAndEndTimeChange() {
      const startTimeStr = startTimeSelected
        ? moment(startTimeSelected).toISOString()
        : null;
      const endTimeStr = endTimeSelected
        ? moment(endTimeSelected).toISOString()
        : null;
      if (
        reportType?.value === ReportTypes.DISTRIBUTION &&
        startTimeSelected &&
        endTimeSelected &&
        metricBody?.start_time !== startTimeStr &&
        metricBody?.end_time !== endTimeStr
      ) {
        const parsedTimeUnit = getParsedTimeUnit({timeUnit: timeUnitSelected});

        dispatch(
          setMetricBodyRedux({
            ...metricBody,
            report_type: ReportTypes.DISTRIBUTION,
            start_time: startTimeStr,
            end_time: endTimeStr,
            time_unit: parsedTimeUnit
          })
        );
      }
    },
    [
      dispatch,
      endTimeSelected,
      metricBody,
      reportType?.value,
      startTimeSelected,
      timeUnitSelected
    ]
  );

  //---> Handle time range change
  React.useEffect(
    function handleTimeRangeChange() {
      const parsedTimeRange = getParsedTimeRange({
        timeRange: timeRangeSelected
      });
      if (
        parsedTimeRange &&
        metricBody?.time_range !== parsedTimeRange?.value
      ) {
        const parsedTimeUnit = getParsedTimeUnit({timeUnit: timeUnitSelected});
        let timeUnit = parsedTimeUnit;
        console.log(
          '===== unit in time range',
          parsedTimeRange?.units?.findIndex(
            item => item?.value === parsedTimeUnit
          )
        );
        if (
          parsedTimeUnit === TimeUnits.GLOBAL ||
          parsedTimeRange?.units?.findIndex(
            item => item?.value === parsedTimeUnit
          ) === -1
        ) {
          console.log(
            '==== set unit for time range',
            JSON.stringify(parsedTimeRange?.units?.[0])
          );
          setValue(
            `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.UNIT}`,
            JSON.stringify(parsedTimeRange?.units?.[0]),
            {
              shouldValidate: true,
              shouldDirty: true
            }
          );
          timeUnit = parsedTimeRange?.units?.[0]?.value;
        }
        dispatch(
          setMetricBodyRedux({
            ...metricBody,
            time_range: parsedTimeRange?.value,
            time_unit: timeUnit
          })
        );
      }
    },
    [
      dispatch,
      metricBody,
      setValue,
      timeRangeSelected,
      timeRangeSelected?.value,
      timeUnitSelected
    ]
  );

  return (
    <FormProvider {...methods}>
      <form
        id="formCreateReport"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <BlockUi tag="div" blocking={formState.isSubmitting}>
          <ModalHeader toggle={toggle}>
            {isViewed ? (
              t('viewReport')
            ) : isEdit ? (
              <ReportName
                name={name}
                parentPath={parentPath}
                reportSource={reportSource}
                metricSet={metricSet}
              />
            ) : (
              t('addReport')
            )}
          </ModalHeader>
          <ModalBody>
            {!isViewed && (
              <>
                <Row>
                  {/* Report source */}
                  <Col md={3}>
                    <ReportSourceSelect
                      defaultValue={defaultValues?.report_source}
                      reportSourceOptions={reportSourceOptions}
                    />
                  </Col>

                  {/* Report Type */}
                  <Col md="3">
                    <ReportTypeSelect
                      defaultValue={defaultValues?.report_type}
                    />
                  </Col>

                  {/* Report By Group */}
                  <ReportByGroup
                    reportSource={reportSource}
                    currentReportBy={defaultValues?.api?.report_by}
                    sourceId={entityId}
                  />
                </Row>

                <Row className="mt-2 mb-2">
                  {/* Time range, Time Unit */}
                  <Col md="12" className="d-flex">
                    {reportType?.value === ReportTypes.TRENDING ? (
                      <TimeRange
                        defaultValue={defaultValues?.api?.time_range}
                      />
                    ) : (
                      <>
                        <Row>
                          <Col xs="6">
                            <StartTime />
                          </Col>
                          <Col xs="6">
                            <EndTime />
                          </Col>
                        </Row>
                      </>
                    )}
                    {reportType?.value === ReportTypes.TRENDING ? (
                      <TimeUnit defaultValue={defaultValues?.api?.time_unit} />
                    ) : (
                      <DistributionUnit
                        defaultValue={defaultValues?.api?.time_unit}
                        startTime={startTimeSelected}
                        endTime={endTimeSelected}
                      />
                    )}
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md="1">
                    <Label className="font-weight-bold">
                      {t('properties')}
                    </Label>
                    <ConfigChart
                      chartTypeDefault={defaultValues?.properties?.chart_type}
                      colorDefault={defaultValues?.properties?.color}
                      metricSet={metricSet}
                    >
                      {/* Config chart */}
                      <DropdownChartType
                        metricSet={metricSet}
                        onChangeColor={handleSelectedColor}
                        onSelectType={handleSelectedChartType}
                        colors={colorsRedux}
                        chartType={chartTypeSelected}
                        isChartCompare={isChartCompare}
                      />
                    </ConfigChart>
                  </Col>
                  {reportType?.value === ReportTypes.TRENDING &&
                    !isChartCompare && (
                      <Col md="2">
                        <Label className="font-weight-bold">{t('mode')}</Label>
                        <ChartMode
                          defaultValue={
                            defaultValues?.properties?.mode || ChartModes.BY
                          }
                        />
                      </Col>
                    )}
                </Row>
              </>
            )}

            {/* Chart preview */}
            <ChartPreview
              reportId={reportId}
              unit={unit}
              metricSet={metricSet}
              timeRange={timeRange}
              entityId={reportByUuid}
              color={colorsRedux}
              reportSource={reportSource}
            />
          </ModalBody>
          <ModalFooter>
            <Button type="button" color="link" onClick={toggle}>
              {isViewed ? 'Close' : 'Cancel'}
            </Button>
            {!isViewed && (
              <Button
                type="submit"
                color="primary"
                disabled={!formState.isDirty}
              >
                Save
              </Button>
            )}
          </ModalFooter>
        </BlockUi>
      </form>
    </FormProvider>
  );
}
