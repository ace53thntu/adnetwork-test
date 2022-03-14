//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {useFormContext, useWatch} from 'react-hook-form';

//---> Internal Modules
import {FormReactSelect} from 'components/forms';
import {Sources} from 'pages/entity-report/constants.js';
import {
  setMetricBodyRedux,
  useMetricsBodySelector
} from 'store/reducers/entity-report';

const propTypes = {
  name: PropTypes.string.isRequired
};

const SourceSelect = ({name = ''}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const metricBody = useMetricsBodySelector();
  const {control} = useFormContext();
  const reportByUuid = useWatch({name, control});

  React.useEffect(() => {
    if (metricBody.report_by !== reportByUuid?.value) {
      dispatch(
        setMetricBodyRedux({
          ...metricBody,
          report_by_uuid: reportByUuid?.value
        })
      );
    }
  }, [dispatch, metricBody, reportByUuid?.value]);

  return (
    <FormReactSelect
      label={t('source')}
      placeholder={t('selectSource')}
      options={Sources}
      name={name}
      isRequired={false}
      labelBold
    />
  );
};

SourceSelect.propTypes = propTypes;

export default SourceSelect;
