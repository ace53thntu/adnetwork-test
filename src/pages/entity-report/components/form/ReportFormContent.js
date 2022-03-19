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
  setMetricBodyRedux,
  useMetricsBodySelector
} from 'store/reducers/entity-report';
import {getReportSources} from 'utils/metrics';
import ChartPreview from '../ChartPreview';
import ConfigChart from './ConfigChart';
import TimeUnit from './TimeUnit';
import ReportByGroup from './ReportByGroup/ReportByGroup';
import ReportSourceSelect from './ReportSourceSelect';
import ReportTypeSelect from './ReportTypeSelect';
import {EndTime} from './TimePeriod/EndTime';
import StartTime from './TimePeriod/StartTime';
import TimeRange from './TimeRange';
import {schemaValidate} from './validation';
import {useDefaultValues} from 'pages/entity-report/hooks';
import {getMetricRequestBody} from 'pages/entity-report/utils/metricRequest';
import {getReportById} from 'pages/entity-report/utils/getReportById';
import {ReportTypes} from 'constants/report';

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
  console.log('🚀 ~ file: ReportFormContent.js ~ line 52 ~ report', report);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const currentReport = useDefaultValues({report});
  const defaultValues = isEdit ? currentReport : initializeDefaultValue;
  const reportSourceOptions = getReportSources();
  const metricBody = useMetricsBodySelector();
  const reportByUuid = getReportById({report, entityId});

  const methods = useForm({
    defaultValues,
    resolver: schemaValidate(t)
  });
  const {handleSubmit, formState, control} = methods;
  const reportType = useWatch({name: 'report_type', control});
  const requestBody = report ? getMetricRequestBody({report}) : null;
  const reportId = report?.uuid;

  React.useEffect(() => {
    if ((isEdit || isViewed) && Object.keys(metricBody).length === 0) {
      dispatch(setMetricBodyRedux(requestBody));
    }
  }, [requestBody, isEdit, isViewed, dispatch, metricBody]);

  return (
    <FormProvider {...methods}>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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
                  <Col md={12} className="d-flex">
                    {reportType?.value === ReportTypes.TRENDING && (
                      <TimeRange
                        defaultValue={defaultValues?.api?.time_range}
                      />
                    )}
                    <TimeUnit defaultValue={defaultValues?.api?.time_unit} />
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col md={3}>
                    <ReportSourceSelect
                      defaultValue={defaultValues?.report_source}
                      reportSourceOptions={reportSourceOptions}
                    />
                  </Col>
                  <Col md={3}>
                    <ReportTypeSelect
                      defaultValue={defaultValues?.report_type}
                    />
                  </Col>
                  <ReportByGroup
                    reportSource={reportSource}
                    currentReportBy={defaultValues?.api?.report_by}
                  />
                </Row>
                <Row className="mb-3">
                  {reportType?.value === ReportTypes.DISTRIBUTION && (
                    <>
                      <Col xs="4">
                        <StartTime />
                      </Col>
                      <Col xs="4">
                        <EndTime />
                      </Col>
                    </>
                  )}
                  <Col md={3}>
                    <Label className="font-weight-bold">Properties</Label>
                    <ConfigChart
                      chartTypeDefault={defaultValues?.properties?.chart_type}
                      colorDefault={defaultValues?.properties?.color}
                      metricSet={metricSet}
                    />
                  </Col>
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
