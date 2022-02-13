// Build-in Modules
import React from 'react';

// External Modules
import {useTranslation} from 'react-i18next';
import {Link, useParams} from 'react-router-dom';
import {Button} from 'reactstrap';

// Internal Modules
import {RoutePaths} from 'constants/route-paths';
import {useQueryString} from 'hooks';
import {StrategyList} from '../strategy';

const CampaignStrategies = () => {
  const {t} = useTranslation();
  const {campaignId} = useParams();
  console.log(
    '🚀 ~ file: strategies.js ~ line 17 ~ CampaignStrategies ~ campaignId',
    campaignId
  );
  const query = useQueryString();
  const advertiserId = query.get('advertiser_id');

  return (
    <>
      <div className="d-flex justify-content-end mb-2">
        <Link to={`/${RoutePaths.CAMPAIGN}`}>
          <Button color="link" className="mr-2">
            {t('backToList')}
          </Button>
        </Link>
        <Link
          to={`/${RoutePaths.CAMPAIGN}/${campaignId}/${RoutePaths.STRATEGY}/${RoutePaths.CREATE}?advertiser_id=${advertiserId}`}
        >
          <Button color="primary">{t('createStrategy')}</Button>
        </Link>
      </div>
      <StrategyList campaignId={campaignId} />
    </>
  );
};

export default React.memo(CampaignStrategies);
