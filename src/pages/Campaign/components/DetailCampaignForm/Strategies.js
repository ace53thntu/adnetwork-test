//---> Build-in Modules
import React from 'react';

//---> External Modules
import {Button, ListGroup} from 'reactstrap';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

//---> Internal Modules
import {useCampaignManager} from '../../hook';
import ListStrategies from '../ListStrategies';
// import {useGetListStrategy} from 'core/queries';

const Strategies = ({campaignIdCreated}) => {
  const {t} = useTranslation();
  const {gotoCreateStrategy, gotoCampaignManagement} = useCampaignManager();
  const {id: campaignId} = useParams();
  // const {data: strategies = []} = useGetListStrategy({campId: campaignId});
  const strategies = [];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          width: '50%'
        }}
      >
        <Button
          onClick={() => gotoCreateStrategy(campaignId || campaignIdCreated)}
          block
          className="mb-2 mr-2"
          color="primary"
        >
          {t('createNewStrategy')}
        </Button>
        {t('or')}
        <Button
          block
          className="mb-2 mr-2"
          color="success"
          onClick={gotoCampaignManagement}
        >
          {t('saveWithoutStrategy')}
        </Button>
      </div>
      {/* List strategy */}
      <div className="w-100 mt-3">
        <ListGroup flush>
          <ListStrategies strategies={strategies} />
        </ListGroup>
      </div>
    </div>
  );
};

export default Strategies;
