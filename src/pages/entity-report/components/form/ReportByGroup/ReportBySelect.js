//---> Build-in Modules
import {FormReactSelect} from 'components/forms';
import {
  PublisherReportBys,
  ReportBys,
  ReportGroupTypes
} from 'pages/entity-report/constants.js';
import {getReportByOptions} from 'pages/entity-report/utils/getReportByOptions';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useReportGroupTypeSelector} from 'store/reducers/entity-report';

const ReportBySelect = ({reportSource, disabled = false}) => {
  const {t} = useTranslation();
  const reportGroupType = useReportGroupTypeSelector();

  return (
    <FormReactSelect
      name="api.report_by"
      label={t('reportBy')}
      labelBold
      placeholder={t('selectReportBy')}
      options={getReportByOptions({
        groupType: reportGroupType,
        reportBy: reportSource,
        options:
          reportGroupType === ReportGroupTypes.ADVERTISER
            ? ReportBys
            : PublisherReportBys
      })}
      disabled={disabled}
    />
  );
};

export default ReportBySelect;
