//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';

//---> Internal Modules
import {FormReactSelect} from 'components/forms';
import {ReportTypeOptions} from 'pages/entity-report/constants.js';
import {REPORT_INPUT_NAME} from 'constants/report';

const ReportTypeSelect = ({disabled = false}) => {
  const {t} = useTranslation();

  return (
    <FormReactSelect
      name={REPORT_INPUT_NAME.REPORT_TYPE}
      label={t('reportType')}
      placeholder={t('selectReportType')}
      options={ReportTypeOptions}
      labelBold
      disabled={disabled}
    />
  );
};

export default ReportTypeSelect;
