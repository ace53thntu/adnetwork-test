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
import './styles/styles.scss';
import {mappingFormToApi} from './dto';
import {schemaValidate} from './components/form/validation';
import {DEFAULT_TIME_RANGE, DEFAULT_TIME_UNIT} from 'constants/report';
import {getReportSources} from 'utils/metrics';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {useCreateReport, useEditReport} from 'queries/report';
import {capitalize} from 'utils/helpers/string.helpers';
import {useChartData} from './hooks';
import {useMetricsDataSelector} from 'store/reducers/entity-report';
import {FormReactSelect} from 'components/forms';
import {ReportTypes} from './constants.js';
import {useTranslation} from 'react-i18next';
import ReportSourceSelect from './components/form/ReportSourceSelect';
import ChartPreview from './components/ChartPreview';
import ReportByGroup from './components/form/ReportByGroup';

const initDefaultValue = ({
  initColors = [],
  metricType,
  distributionBy,
  entityType
}) => {
  console.log(
    '🚀 ~ file: create-report.modal.js ~ line 53 ~ entityType',
    entityType
  );
  return {
    properties: {
      color: JSON.stringify(initColors),
      chart_type: 'line'
    },
    api: {
      unit: null,
      time_range: null,
      report_by: {label: capitalize(entityType), value: entityType}
    },
    report_source: {label: capitalize(entityType), value: entityType}
  };
};

export default function ModalReportForm({
  modal = false,
  toggle = () => {},
  metricSet = [],
  initColors = [],
  isEdit = false,
  reportItem = {},
  defaultValues: currentReport = {},
  unit,
  timeRange,
  isViewed = false,
  metricType = '',
  distributionBy = '',
  entityType = '',
  entityId,
  ownerRole,
  ownerId
}) {
  console.log(
    '🚀 ~ file: create-report.modal.js ~ line 84 ~ currentReport',
    currentReport
  );
  const {t} = useTranslation();
  const {mutateAsync: createReport} = useCreateReport({entityId, entityType});
  const {mutateAsync: updateReport} = useEditReport();
  const metrics = useMetricsDataSelector();

  const reportSourceOptions = getReportSources();

  const defaultValues = isEdit
    ? currentReport
    : initDefaultValue({initColors, metricType, distributionBy, entityType});

  const chartData = useChartData({
    metrics,
    unit: !isEdit ? DEFAULT_TIME_UNIT : unit,
    timeRange: !isEdit ? DEFAULT_TIME_RANGE : timeRange,
    metricSet,
    entityId
  });

  const methods = useForm({
    defaultValues,
    resolver: schemaValidate()
  });
  const {handleSubmit, formState, control, errors} = methods;
  const reportType = useWatch({name: 'report_type', control});
  const startDate = useWatch({name: 'api.start_time', control});

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
        await updateReport({reportId: reportItem?.uuid, data: submitData});
        ShowToast.success('Updated report successfully');
        toggle();
      } catch (error) {
        ShowToast.error(error?.msg || 'Fail to update report');
      }
    }
  };

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      size="lg"
      style={{maxWidth: '1350px'}}
    >
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
                      <TimeRange
                        defaultValue={defaultValues?.api?.time_range}
                      />
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
                      <FormReactSelect
                        name="report_type"
                        label={t('reportType')}
                        placeholder={t('selectReportType')}
                        options={ReportTypes}
                        labelBold
                      />
                    </Col>
                    <ReportByGroup reportSource={entityType} />
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
                chartData={chartData}
                unit={unit}
                metricSet={metricSet}
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
    </Modal>
  );
}
