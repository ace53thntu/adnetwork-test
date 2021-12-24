import {FormReactSelect} from 'components/forms';
import {
  DEFAULT_TIME_RANGE,
  DEFAULT_TIME_UNIT,
  REPORT_VIEW_TYPES
} from 'constants/report';
import moment from 'moment';
//---> External Modules
import PropTypes from 'prop-types';
import {useGenerateReportUrl} from 'queries/report';
//---> Build-in Modules
import React from 'react';
import {FormProvider, useForm, useWatch} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {Button, FormGroup, Label, Spinner} from 'reactstrap';
import {setMetricUrlRedux} from 'store/reducers/entity-report';

//---> Internal Modules
import ModalReportForm from './create-report.modal';

const randomHex = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, '0')}`;

const ReportForm = ({
  entityId = null,
  entityType = '',
  distributionBy = '',
  metricType = '',
  ownerId,
  ownerRole
}) => {
  const dispatch = useDispatch();
  const {mutateAsync: generateReportUrl} = useGenerateReportUrl();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showReportForm, setShowReportForm] = React.useState(false);

  const methods = useForm({
    defaultValues: {
      metric_set: null
    }
  });
  const {handleSubmit, control, reset} = methods;
  const seletedMetricSet = useWatch({name: 'metric_set', control});
  const colors = React.useMemo(() => {
    const colors = seletedMetricSet?.map(item => {
      return randomHex();
    });
    return colors;
  }, [seletedMetricSet]);

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
    const data = {
      name: `Strategy report - ${moment().format('DD-MM-YYYY hh:mm')}`,
      type: 'overview',
      service: 'service',
      entity_uuid: entityId,
      entity_type: entityType,
      properties: {
        config: {
          chart_type: 'bar',
          color: 'red',
          metric_set: seletedMetricSet?.code || ''
        }
      },
      api: {
        unit: DEFAULT_TIME_UNIT,
        time_range: DEFAULT_TIME_RANGE,
        distribution_by: distributionBy,
        metric_type: metricType
      }
    };
    try {
      const {data: {url} = {}} = await generateReportUrl(data);
      dispatch(setMetricUrlRedux(url));
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
                options={REPORT_VIEW_TYPES}
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
                    disabled={isLoading || !seletedMetricSet}
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
          metricSet={seletedMetricSet}
          initColors={colors}
          metricType={metricType}
          distributionBy={distributionBy}
          entityType={entityType}
          entityId={entityId}
          ownerId={ownerId}
          ownerRole={ownerRole}
        />
      )}
    </>
  );
};

ReportForm.propTypes = {
  entityId: PropTypes.string,
  entityType: PropTypes.string,
  distributionBy: PropTypes.string,
  metricType: PropTypes.string
};

export default ReportForm;
