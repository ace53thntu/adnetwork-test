//---> Build-in Modules
import React from 'react';
// import PropTypes from 'prop-types';

//---> External Modules
import {FormProvider, useForm} from 'react-hook-form';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CardBody,
  Label
} from 'reactstrap';
import BlockUi from 'react-block-ui';

//---> Internal Modules
import FormControlUnit from './components/form/FormControlUnit';
import CustomLineChart from './components/form/CustomLineChart';
import TimeRange from './components/form/TimeRange';
import ConfigChart from './components/form/ConfigChart';
import './styles/styles.scss';
import {mappingFormToApi} from './dto';
import {schemaValidate} from './components/form/validation';
import SelectDistribution from './components/form/SelectDistribution';
import SelectMetricType from './components/form/SelectMetricType';
import CustomPieChart from './components/form/CustomPieChart';
import {
  DEFAULT_TIME_RANGE,
  DEFAULT_TIME_UNIT,
  INPUT_NAME,
  METRIC_SETS,
  METRIC_TYPE_OPTIONS
} from 'constants/report';
import {getDistributions} from 'utils/metrics';
import {useGetMetrics} from 'queries/metric/useGetMetrics';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {useCreateReport, useEditReport} from 'queries/report';
import {capitalize} from 'utils/helpers/string.helpers';
import {useChartData} from './hooks';

const initDefaultValue = ({
  initColors = [],
  metricType,
  distributionBy,
  entityType
}) => {
  return {
    properties: {
      color: JSON.stringify(initColors),
      chart_type: 'line'
    },
    api: {
      unit: null,
      time_range: null,
      distribution_by: {label: capitalize(entityType), value: distributionBy},
      metric_type: {label: `Distribution ${entityType}`, value: metricType}
    }
  };
};

export default function ModalReportForm({
  modal = false,
  toggle = () => {},
  metricUrl = '',
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
  const {mutateAsync: createReport} = useCreateReport({entityId, entityType});
  const {mutateAsync: updateReport} = useEditReport();

  const distributionOptions = getDistributions();
  // Data sample
  const {data: metrics} = useGetMetrics({
    url: metricUrl
  });
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
  const {handleSubmit, formState, watch} = methods;
  const selectedType = watch(INPUT_NAME.CHART_TYPE);

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
        await updateReport({reportId: reportItem?.id, data: submitData});
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
              {isViewed ? 'View Report' : isEdit ? 'Edit Report' : 'Add Report'}
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
                        defaultValue={defaultValues?.api?.unit}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col md={4}>
                      <SelectDistribution
                        defaultValue={defaultValues?.api?.distribution_by}
                        distributionOptions={distributionOptions}
                      />
                    </Col>
                    <Col md={4}>
                      <SelectMetricType
                        metricTypeOptions={METRIC_TYPE_OPTIONS}
                        defaultValue={defaultValues?.api?.metric_type}
                      />
                    </Col>
                    <Col md={4}>
                      <Label>&nbsp;</Label>
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
              <Row className="chart-preview">
                <Col sm="12">
                  <Card>
                    <CardBody
                      style={{
                        padding: 10,
                        width: selectedType === 'pie' ? '450px' : '100%',
                        margin: '0 auto'
                      }}
                    >
                      {(selectedType === 'line' ||
                        selectedType === 'multiline' ||
                        selectedType === 'bar') && (
                        <CustomLineChart
                          series={chartData?.series}
                          categories={chartData?.categories}
                          nameOfSeries={
                            METRIC_SETS?.[metricSet?.code]?.label || 'No label'
                          }
                          unit={unit || DEFAULT_TIME_UNIT}
                          metricSet={metricSet}
                        />
                      )}
                      {selectedType === 'pie' && (
                        <CustomPieChart
                          series={chartData?.series}
                          categories={chartData?.categories}
                          nameOfSeries={
                            METRIC_SETS?.[metricSet?.code]?.label || 'No label'
                          }
                          unit={unit || DEFAULT_TIME_UNIT}
                          metricSet={metricSet}
                        />
                      )}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
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
