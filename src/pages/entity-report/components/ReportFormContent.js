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
  setChartColorSelectedRedux
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

  // Selectors
  const metricBody = useMetricsBodySelector();
  const metricateSelected = useMetricsetSelectedSelector();
  // const chartTypeSelectedRedux = useChartTypeSelectedSelector();
  const reportByUuid = getReportById({report, entityId});

  const methods = useForm({
    defaultValues,
    resolver: schemaValidate(t)
  });
  const {handleSubmit, formState, control, setValue} = methods;
  const requestBody = report ? getMetricRequestBody({report}) : null;
  const reportId = report?.uuid;

  // Watch form value changed'
  const reportType = useWatch({name: REPORT_INPUT_NAME.REPORT_TYPE, control});
  const reportBySelected = useWatch({
    name: `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.REPORT_BY}`,
    control
  });
  const reportByUuidSelected = useWatch({
    name: `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.REPORT_BY_UUID}`,
    control
  });
  const timeUnitSelected = useWatch({
    name: `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.UNIT}`,
    control
  });
  const chartTypeSelected = useWatch({
    name: `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.CHART_TYPE}`,
    control
  });

  const colorsSelected = useWatch({
    name: `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.COLOR}`,
    control
  });

  const isChartCompare =
    !reportByUuidSelected && reportSource !== reportBySelected?.value;

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
    _colors => {
      dispatch(setChartColorSelectedRedux(_colors));
    },
    [dispatch]
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
            report_by_uuid: ''
          })
        );
      }
    },
    [dispatch, metricBody, reportBySelected?.value]
  );

  //---> Handle report by uuid change
  React.useEffect(
    function handleReportByUuidChange() {
      if (
        reportByUuidSelected &&
        metricBody.report_by_uuid !== reportByUuidSelected?.value
      ) {
        dispatch(
          setMetricBodyRedux({
            ...metricBody,
            report_by: reportBySelected?.value,
            report_by_uuid: reportByUuidSelected?.value,
            time_unit: getParsedTimeUnit({timeUnit: timeUnitSelected})
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
        if (chartTypeSelected !== ChartTypes.PIE) {
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
      timeUnitSelected
    ]
  );

  //---> Handle chart type change
  React.useEffect(function handleChartTypeChange() {}, []);

  React.useEffect(
    function initChartTypeWithGlobalTimeRange() {
      console.log(
        '=== initChartTypeWithGlobalTimeRange',
        chartTypeSelected,
        metricateSelected.length,
        metricBody.time_unit
      );
      if (
        isChartCompare &&
        ![ChartTypes.BAR, ChartTypes.PIE].includes(chartTypeSelected) &&
        metricBody.time_unit !== TimeUnits.GLOBAL &&
        metricateSelected?.length < 2
      ) {
        console.log('TIME UNIT GLOBAL ===');
        setValue(
          `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.CHART_TYPE}`,
          ChartTypes.PIE
        );
        dispatch(setChartTypeSelectedRedux(ChartTypes.PIE));
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

  return (
    <FormProvider {...methods}>
      <form
        id="formCreateReport"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <BlockUi tag="div" blocking={formState.isSubmitting}>
          <ModalHeader toggle={toggle}>
            {isViewed
              ? t('viewReport')
              : isEdit
              ? t('editReport')
              : t('addReport')}
          </ModalHeader>
          <ModalBody>
            {!isViewed && (
              <>
                <Row>
                  <Col md="12" className="d-flex">
                    {reportType?.value === ReportTypes.TRENDING ? (
                      <TimeRange
                        defaultValue={defaultValues?.api?.time_range}
                      />
                    ) : (
                      <>
                        <Col xs="4">
                          <StartTime />
                        </Col>
                        <Col xs="4">
                          <EndTime />
                        </Col>
                      </>
                    )}
                    {reportType?.value === ReportTypes.TRENDING ? (
                      <TimeUnit defaultValue={defaultValues?.api?.time_unit} />
                    ) : (
                      <DistributionUnit
                        defaultValue={defaultValues?.api?.time_unit}
                        startTime={defaultValues?.api?.start_time}
                        endTime={defaultValues?.api?.end_time}
                      />
                    )}
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col md={3}>
                    <ReportSourceSelect
                      defaultValue={defaultValues?.report_source}
                      reportSourceOptions={reportSourceOptions}
                    />
                  </Col>
                  <Col md="3">
                    <ReportTypeSelect
                      defaultValue={defaultValues?.report_type}
                    />
                  </Col>
                  <ReportByGroup
                    reportSource={reportSource}
                    currentReportBy={defaultValues?.api?.report_by}
                    sourceId={entityId}
                  />
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
                      <DropdownChartType
                        metricSet={metricSet}
                        onChangeColor={handleSelectedColor}
                        onSelectType={handleSelectedChartType}
                        colors={colorsSelected}
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
              color={defaultValues?.properties?.color}
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
