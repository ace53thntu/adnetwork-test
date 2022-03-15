//---> Build-in Modules
import React from 'react';
// import PropTypes from 'prop-types';

//---> External Modules
import {Controller, FormProvider, useForm, useWatch} from 'react-hook-form';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Label,
  FormGroup
} from 'reactstrap';
import BlockUi from 'react-block-ui';
import DatePicker from 'react-datepicker';

//---> Internal Modules
import FormControlUnit from './components/form/FormControlUnit';
import TimeRange from './components/form/TimeRange';
import ConfigChart from './components/form/ConfigChart';
import {mappingFormToApi} from './dto';
import {schemaValidate} from './components/form/validation';
import {getReportSources} from 'utils/metrics';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {useCreateReport, useEditReport, useGetReport} from 'queries/report';
import {capitalize} from 'utils/helpers/string.helpers';
import {useDefaultValues} from './hooks';
import {useTranslation} from 'react-i18next';
import ReportSourceSelect from './components/form/ReportSourceSelect';
import ChartPreview from './components/ChartPreview';
import ReportByGroup from './components/form/ReportByGroup/ReportByGroup';
import {QueryStatuses} from 'constants/react-query';
import {getMetricRequestBody} from './utils/metricRequest';
import {useDispatch} from 'react-redux';
import {setMetricBodyRedux} from 'store/reducers/entity-report';
import ReportTypeSelect from './components/form/ReportTypeSelect';
import {useDeepCompareEffectNoCheck} from 'hooks/useDeepCompareEffect';
import {
  DEFAULT_TIME_RANGE,
  DEFAULT_TIME_UNIT,
  METRIC_TIMERANGES
} from 'constants/report';
import './styles/styles.scss';

const initDefaultValue = ({
  initColors = [],
  metricType,
  distributionBy,
  entityType
}) => {
  const timeRange = METRIC_TIMERANGES.find(
    item => item.value === DEFAULT_TIME_RANGE
  );
  return {
    properties: {
      color: JSON.stringify(initColors),
      chart_type: 'line'
    },
    api: {
      time_unit: timeRange?.units.find(
        item => item.value === DEFAULT_TIME_UNIT
      ),
      time_range: JSON.stringify(timeRange),
      report_by: {label: capitalize(entityType), value: entityType}
    },
    report_source: {label: capitalize(entityType), value: entityType},
    report_type: {label: capitalize('trending'), value: 'trending'}
  };
};

export default function ModalReportForm({
  modal = false,
  toggle = () => {},
  metricSet = [],
  initColors = [],
  isEdit = false,
  defaultValues: currentReport = {},
  unit,
  timeRange,
  isViewed = false,
  metricType = '',
  distributionBy = '',
  entityType = '',
  entityId,
  ownerRole,
  ownerId,
  reportId
}) {
  const {data: report, status, error} = useGetReport(reportId, !!reportId);

  const {mutateAsync: createReport} = useCreateReport({entityId, entityType});
  const {mutateAsync: updateReport} = useEditReport();

  const initializeDefaultValue = initDefaultValue({
    initColors,
    metricType,
    distributionBy,
    entityType
  });

  const onSubmit = async formData => {
    const submitData = mappingFormToApi({
      formData,
      entityId,
      metricSet,
      metricType,
      entityType,
      ownerRole,
      ownerUuid: ownerId
    });
    console.log(
      '🚀 ~ file: create-report.modal.js ~ line 131 ~ submitData',
      submitData
    );
    if (!isEdit) {
      try {
        await createReport(submitData);
        ShowToast.success('Created report successfully');
        toggle();
      } catch (error) {
        ShowToast.error(error?.msg || 'Fail to create report');
      }
    } else {
      try {
        await updateReport({reportId: report?.uuid, data: submitData});
        ShowToast.success('Updated report successfully');
        toggle();
      } catch (error) {
        ShowToast.error(error?.msg || 'Fail to update report');
      }
    }
  };

  if (status === QueryStatuses.LOADING) {
    return <div>Loading...</div>;
  }

  if (status === QueryStatuses.ERROR) {
    return <span>Error: {error.msg}</span>;
  }

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      size="lg"
      style={{maxWidth: '1350px'}}
    >
      <ReportFormConcent
        initializeDefaultValue={initializeDefaultValue}
        report={report}
        onSubmit={onSubmit}
        toggle={toggle}
        isViewed={isViewed}
        isEdit={isEdit}
        reportSource={entityType}
        metricSet={metricSet}
        timeRange={timeRange}
        entityId={entityId}
        unit={unit}
      />
    </Modal>
  );
}

const ReportFormConcent = ({
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
}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const currentReport = useDefaultValues({report});
  const defaultValues = isEdit ? currentReport : initializeDefaultValue;
  const reportSourceOptions = getReportSources();
  console.log('==== initializeDefaultValue', initializeDefaultValue);
  const methods = useForm({
    defaultValues,
    resolver: schemaValidate()
  });
  const {handleSubmit, formState, control, errors} = methods;
  const reportType = useWatch({name: 'report_type', control});

  const startDate = useWatch({name: 'api.start_time', control});
  const requestBody = report ? getMetricRequestBody({report}) : null;
  console.log(
    '🚀 ~ file: create-report.modal.js ~ line 187 ~ requestBody',
    requestBody
  );
  const reportId = report?.uuid;

  useDeepCompareEffectNoCheck(() => {
    if (isEdit && isViewed) {
      dispatch(setMetricBodyRedux(requestBody));
    }
  }, [requestBody, isEdit, isViewed]);

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
                    <TimeRange defaultValue={defaultValues?.api?.time_range} />
                    <FormControlUnit
                      defaultValue={defaultValues?.api?.time_unit}
                    />
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
                  {reportType?.value === 'distribution' && (
                    <>
                      <Col xs="4">
                        <FormGroup>
                          <Label for="startDate" className="font-weight-bold">
                            <span className="text-danger">*</span>
                            {t('startDate')}
                          </Label>
                          <Controller
                            control={control}
                            name="api.start_time"
                            render={({onChange, onBlur, value, name}) => (
                              <DatePicker
                                selected={value}
                                onChange={date => onChange(date)}
                                className="form-control"
                                dateFormat="dd/MM/yyyy"
                                placeholderText="dd/mm/yyyy"
                              />
                            )}
                          />
                          {errors && errors['api']?.['start_time'] ? (
                            <div className="invalid-feedback d-block">
                              {errors['api']?.['start_time']?.message}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col xs="4">
                        <FormGroup>
                          <Label for="endDate" className="font-weight-bold">
                            <span className="text-danger">*</span>
                            End date
                          </Label>
                          <Controller
                            control={control}
                            name="api.end_time"
                            render={({onChange, onBlur, value, name}) => (
                              <DatePicker
                                selected={value}
                                onChange={date => onChange(date)}
                                className="form-control"
                                dateFormat="dd/MM/yyyy"
                                placeholderText="dd/mm/yyyy"
                                minDate={startDate}
                                startDate={startDate}
                                endDate={value}
                                selectsEnd
                              />
                            )}
                          />
                          {errors && errors['api']?.['end_time'] ? (
                            <div className="invalid-feedback d-block">
                              {errors['api']?.['end_time']?.message}
                            </div>
                          ) : null}
                        </FormGroup>
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
              entityId={entityId}
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
};
