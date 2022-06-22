//---> Build-in Modules
import React from 'react';

//---> External Modules
import BlockUi from 'react-block-ui';
import {FormProvider, useForm, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
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
import {getReportSources} from 'utils/metrics';
import ChartPreview from './ChartPreview';
import ConfigChart from './form/ChartConfig/ConfigChart';
import ReportByGroup from './form/ReportByGroup/ReportByGroup';
import ReportSourceSelect from './form/ReportSourceSelect';
import ReportTypeSelect from './form/ReportTypeSelect';
import TimeRange from './form/TimeRange';
import {schemaValidate} from './form/validation';
import {useDefaultValues, useIsChartCompare} from 'pages/entity-report/hooks';
import {getReportById} from 'pages/entity-report/utils/getReportById';
import {ChartModes, ReportTypes, REPORT_INPUT_NAME} from 'constants/report';
import DistributionUnit from './form/TimeUnit/DistributionUnit';
import ChartMode from './form/ChartConfig/ChartMode';
import DropdownChartType from './form/ChartConfig/DropdownChartType';
import ReportName from './report-item/ReportName';
import TimeUnit from './form/TimeUnit';
import TimePeriod from './form/TimePeriod';
import {FormReactSelect} from 'components/forms';
import {getListTimeZone} from 'utils/helpers/getListTimezone';
import {useDefaultTimezoneSelector} from 'store/reducers/entity-report';

export default function ReportFormContent({
  initializeDefaultValue,
  report,
  onSubmit,
  toggle,
  isViewed = false,
  isEdit = false,
  reportSource,
  metricSet,
  unit,
  timeRange,
  entityId,
  noEdit
}) {
  const {t} = useTranslation();
  const defaultTimezone = useDefaultTimezoneSelector();
  const currentReport = useDefaultValues({report, defaultTimezone});

  const defaultValues = isEdit ? currentReport : initializeDefaultValue;

  const reportSourceOptions = getReportSources();

  const parentPath = report?.properties?.parentPath || '';
  const name = report?.name || '';

  const reportByUuid = getReportById({report, entityId});

  const methods = useForm({
    defaultValues,
    resolver: schemaValidate(t)
  });
  const {handleSubmit, formState, control, watch} = methods;
  const reportId = report?.uuid;

  // Watch form value changed'
  const reportType = useWatch({name: REPORT_INPUT_NAME.REPORT_TYPE, control});

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

  const isChartCompare = useIsChartCompare({
    reportByUuid: reportByUuidSelected?.value,
    reportBy: reportBySelected?.value,
    reportSource
  });

  const isTrending = React.useMemo(
    () => reportType?.value === ReportTypes.TRENDING,
    [reportType?.value]
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
            <TitleHeader
              {...{isViewed, isEdit, name, parentPath, reportSource, metricSet}}
            />
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
                      disabled={isEdit}
                    />
                  </Col>

                  {/* Report By Group */}
                  <ReportByGroup
                    reportSource={reportSource}
                    currentReportBy={defaultValues?.api?.report_by}
                    sourceId={entityId}
                    disabled={isEdit}
                  />
                </Row>

                <Row className="mt-2 mb-2">
                  {/* Time range, Time Unit */}
                  <Col md="12" className="d-flex">
                    {isTrending ? (
                      <TimeRange
                        defaultValue={defaultValues?.api?.time_range}
                      />
                    ) : (
                      <TimePeriod />
                    )}
                    {isTrending ? (
                      <TimeUnit
                        defaultTimeRange={defaultValues?.api?.time_range}
                        defaultTimeUnit={defaultValues?.api?.time_unit}
                      />
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
                  <Col md="2">
                    <FormReactSelect
                      name="api.time_zone"
                      placeholder="Time zone"
                      label="Time zone"
                      options={getListTimeZone()}
                    />
                  </Col>
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
                        isChartCompare={isChartCompare}
                        defaultChartType={defaultValues?.properties?.chart_type}
                      />
                    </ConfigChart>
                  </Col>
                  {isTrending && !isChartCompare && (
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
              reportSource={reportSource}
              defaultColors={defaultValues?.properties?.color}
              sourceUuid={entityId}
            />
          </ModalBody>
          <ModalFooter>
            <ActionFooter {...{isViewed, formState, toggle, noEdit}} />
          </ModalFooter>
        </BlockUi>
      </form>
    </FormProvider>
  );
}

const TitleHeader = ({
  isViewed,
  isEdit,
  name,
  parentPath,
  reportSource,
  metricSet
}) => {
  const {t} = useTranslation();
  return (
    <>
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
    </>
  );
};

const ActionFooter = ({isViewed, formState, toggle, noEdit}) => {
  return (
    <>
      <Button type="button" color="link" onClick={toggle}>
        {isViewed ? 'Close' : 'Cancel'}
      </Button>
      {!isViewed && !noEdit && (
        <Button type="submit" color="primary" disabled={!formState.isDirty}>
          Save
        </Button>
      )}
    </>
  );
};
