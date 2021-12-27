import {RoutePaths} from 'constants/route-paths';
//---> Internal Modules
import {EntityReport} from 'pages/entity-report';
//---> Build-in Modules
import React, {useCallback, useMemo, useState} from 'react';
//---> External Modules
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';

import CappingManagement from '../capping';
import {Divider, Tabs} from '../components';
import {useCampaignManager} from '../hooks';
import StrategyForm from './form';
// import Audience from './form-fields/Audience';
import Concept from './form-fields/Concept';

const StrategyViewTabs = ({currentStrategy = {}, campaignId}) => {
  const {t} = useTranslation();
  const {gotoCampaignManagement} = useCampaignManager();
  const ownerId = currentStrategy?.campaign?.advertiser_uuid;
  const [currentTab, setCurrentTab] = useState('description');
  const goTo = useCallback(({nextTab}) => {
    setCurrentTab(nextTab);
  }, []);

  const tabDetail = useMemo(
    () =>
      [
        {
          name: t('description'),
          content: (
            <>
              <Divider text="Information"></Divider>
              <StrategyForm
                goTo={goTo}
                campaignId={campaignId}
                gotoCampaignManagement={gotoCampaignManagement}
                isView
                currentStrategy={currentStrategy}
              />
              {/* <div className="pt-2"></div> */}
              <Divider text="Audience"></Divider>
              {/* <Audience
                goTo={goTo}
                listAudiences={[]}
                dataStrategy={currentStrategy}
                isView
              /> */}
              <div className="pt-4"></div>
              <Divider text="Concept"></Divider>
              <Concept listConcept={currentStrategy?.concepts} isView />
              <div style={{textAlign: 'right'}}>
                <Link
                  to={`/${RoutePaths.CAMPAIGN}/${currentStrategy?.campaign_uuid?.value}/${RoutePaths.STRATEGY}/${currentStrategy?.uuid}/edit`}
                >
                  <Button color="link">Go to Edit</Button>
                </Link>
              </div>
            </>
          )
        },
        {
          name: 'Capping',
          content: <CappingManagement />
        },
        {
          name: 'Report',
          content: (
            <EntityReport
              entity="strategy"
              entityId={currentStrategy?.uuid}
              ownerId={ownerId}
              ownerRole="advertiser"
            />
          )
        }
      ].map(({name, content}, index) => ({
        key: index,
        title: name,
        getContent: () => content
      })),
    [campaignId, goTo, gotoCampaignManagement, ownerId, currentStrategy, t]
  );

  const getTab = index => {
    switch (index) {
      case 0:
        setCurrentTab('description');
        break;
      case 1:
        setCurrentTab('capping');
        break;

      case 2:
        setCurrentTab('report');
        break;
      default:
        break;
    }
  };

  const tabPicker = useCallback(() => {
    switch (currentTab) {
      case 'description':
        return 0;
      case 'capping':
        return 1;
      case 'report':
        return 2;
      default:
        return 0;
    }
  }, [currentTab]);

  return <Tabs items={tabDetail} tab={tabPicker} getTab={getTab} />;
};

export default StrategyViewTabs;
