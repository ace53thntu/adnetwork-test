//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Col} from 'reactstrap';
import {useFormContext, useWatch} from 'react-hook-form';

//---> Internal Modules
import CampaignSelect from './ReportByUuid/CampaignSelect';
import StrategySelect from './ReportByUuid/StrategySelect';
import ConceptSelect from './ReportByUuid/ConceptSelect';
import NativeAdSelect from './ReportByUuid/NativeAdsSelect';
import VideoSelect from './ReportByUuid/VideoSelect';
import CreativeSelect from './ReportByUuid/CreativeSelect';
import SourceSelect from './ReportByUuid/SourceSelect';
import PositionSelect from 'components/forms/PositionSelect';
import ReportBySelect from './ReportBySelect';

const ReportByGroup = ({reportSource, currentReportBy}) => {
  const {t} = useTranslation();
  const {control, setValue} = useFormContext();

  const getReportByUuid = React.useCallback(() => {
    return {
      campaign: (
        <CampaignSelect
          label={t('campaign')}
          placeholder={t('selectCampaign')}
          name="api.report_by_uuid"
        />
      ),
      strategy: (
        <StrategySelect
          label={t('strategy')}
          placeholder={t('selectStrategy')}
          name="api.report_by_uuid"
        />
      ),
      concept: (
        <ConceptSelect
          label={t('concept')}
          placeholder={t('selectConcept')}
          name="api.report_by_uuid"
        />
      ),
      creative: (
        <CreativeSelect
          label={t('creative')}
          placeholder={t('selectCreative')}
          name="api.report_by_uuid"
        />
      ),
      native_ad: (
        <NativeAdSelect
          label={t('nativeAds')}
          placeholder={t('selectNativeAds')}
          name="api.report_by_uuid"
        />
      ),
      video: (
        <VideoSelect
          label={t('video')}
          placeholder={t('selectVideo')}
          name="api.report_by_uuid"
        />
      ),
      source: <SourceSelect name="api.report_by_uuid" />,
      position: (
        <PositionSelect
          name="api.report_by_uuid"
          label={t('position')}
          placeholder={t('selectPosition')}
        />
      )
    };
  }, [t]);

  const reportBySelected = useWatch({name: 'api.report_by', control});
  const reportSourceSelected = useWatch({name: 'report_source', control});

  React.useEffect(() => {
    if (currentReportBy?.value !== reportBySelected?.value) {
      setValue('api.report_by_uuid', null, {
        shouldDirty: true,
        shouldValidate: true
      });
    }
  }, [currentReportBy, reportBySelected, setValue]);

  return (
    <>
      <Col md={3}>
        <ReportBySelect reportSource={reportSource} />
      </Col>
      {reportBySelected &&
        reportBySelected.value !== reportSourceSelected?.value && (
          <Col md="3">{getReportByUuid()[reportBySelected.value]}</Col>
        )}
    </>
  );
};

export default ReportByGroup;
