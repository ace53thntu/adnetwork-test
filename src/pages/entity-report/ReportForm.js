//---> Build-in Modules
import {FormReactSelect} from 'components/forms';
import {DEFAULT_TIMEZONE} from 'constants/misc.js';
import {
  DEFAULT_TIME_RANGE,
  DEFAULT_TIME_UNIT,
  PUBLISHER_REPORT_VIEW_TYPES,
  ReportTypes,
  REPORT_VIEW_TYPES
} from 'constants/report';
//---> External Modules
import PropTypes from 'prop-types';
//---> Internal Modules
import {useGenerateReportUrl} from 'queries/report';
import React from 'react';
import {FormProvider, useForm, useWatch} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {Button, FormGroup, Label, Spinner} from 'reactstrap';
import {
  setMetricBodyRedux,
  setMetricDataRedux,
  setMetricSetSelectedRedux,
  useReportGroupTypeSelector
} from 'store/reducers/entity-report';
import {TimezoneMapping} from 'utils/helpers/getListTimezone.js';
import {ReportGroupTypes} from './constants.js/index.js';
import ModalReportForm from './ReportCreateModal';
import {getReportById} from './utils/getReportById';
import {randomHex} from './utils/parseColors';

// Component
const ReportForm = ({
  entityId = null,
  entityType = '',
  metricType = '',
  ownerRole
}) => {
  const dispatch = useDispatch();
  const {mutateAsync: getReportMetric} = useGenerateReportUrl();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showReportForm, setShowReportForm] = React.useState(false);
  const reportTypeGroup = useReportGroupTypeSelector();
  const reportByUuid = getReportById({report: null, entityId});

  const methods = useForm({
    defaultValues: {
      metric_set: null
    }
  });
  const {handleSubmit, control, reset} = methods;
  const selectedMetricSet = useWatch({name: 'metric_set', control});
  const colors = React.useMemo(() => {
    const colors = selectedMetricSet?.map(item => {
      return randomHex();
    });
    return colors;
  }, [selectedMetricSet]);

  const toggleModalReportForm = () => {
    setShowReportForm(prevState => !prevState);
  };

  React.useEffect(() => {
    if (!showReportForm) {
      reset({metric_set: null});
    }
  }, [reset, showReportForm]);

  const onSubmit = async () => {
    setIsLoading(true);
    const requestBody = {
      source_uuid: entityId,
      report_by_uuid: reportByUuid,
      report_type: ReportTypes.TRENDING,
      time_unit: DEFAULT_TIME_UNIT,
      time_range: DEFAULT_TIME_RANGE,
      report_source: entityType,
      report_by: entityType,
      time_zone: TimezoneMapping[DEFAULT_TIMEZONE]
    };
    try {
      const {data} = await getReportMetric(requestBody);
      dispatch(setMetricBodyRedux(requestBody));
      dispatch(setMetricDataRedux(data));
      dispatch(setMetricSetSelectedRedux(selectedMetricSet));
      toggleModalReportForm();
    } catch (error) {
      // TODO: handle error generate report
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} id="formReport">
          <div className="report-action d-flex justify-content-end">
            <div style={{width: '400px', marginRight: '15px'}}>
              <FormReactSelect
                name="metric_set"
                options={
                  reportTypeGroup === ReportGroupTypes.ADVERTISER
                    ? REPORT_VIEW_TYPES
                    : PUBLISHER_REPORT_VIEW_TYPES
                }
                label={<span className="font-weight-bold">Report type</span>}
                placeholder="Select type..."
                menuPlacement="top"
                multiple
                isClearable
              />
            </div>
            <div>
              <FormGroup>
                <Label for="">&nbsp;</Label>
                <div>
                  <Button
                    type="submit"
                    color="primary"
                    disabled={isLoading || !selectedMetricSet}
                    form="formReport"
                  >
                    {isLoading ? (
                      <>
                        <Spinner size="sm" color="light" /> Creating...
                      </>
                    ) : (
                      'Add Report'
                    )}
                  </Button>
                </div>
              </FormGroup>
            </div>
          </div>
        </form>
      </FormProvider>
      {showReportForm && (
        <ModalReportForm
          modal={showReportForm}
          toggle={toggleModalReportForm}
          metricSet={selectedMetricSet}
          initColors={colors}
          metricType={metricType}
          entityType={entityType}
          entityId={entityId}
          ownerRole={ownerRole}
          unit={DEFAULT_TIME_UNIT}
        />
      )}
    </>
  );
};

ReportForm.propTypes = {
  entityId: PropTypes.string,
  entityType: PropTypes.string,
  metricType: PropTypes.string
};

export default ReportForm;
