//---> Build-in Modules
import React, {useCallback, useMemo, useState} from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Button, Container} from 'reactstrap';
import {Link} from 'react-router-dom';

//---> Internal Modules
import {PageTitleAlt} from 'components/layouts/Admin/components';
// import {useGetCampaigns} from 'core/queries';
import CappingManagement from '../../capping';
import {Divider, Tabs} from '..';
import {listEngine, listEngineFirstPrice} from '../../constants';
import {useCampaignManager, useDestructureCampaignOptions} from '../../hooks';
import {useGetDefaultStrategy} from '../../hooks/useGetDefaultStrategy';
// import Audience from './Audience';
import DescriptionStrategy from './DescriptionStrategy';
import Concept from '../../strategy/form-fields/Concept';
import EntityReport from 'pages/entity-report';
import {useGetCampaigns} from 'queries/campaign';

const StrategyFormDetailView = ({
  isEdit,
  currentStrategy = {},
  campaignId,
  viewOnly
}) => {
  const {t} = useTranslation();
  const {gotoCampaignManagement} = useCampaignManager();
  const {data: {items: listCampaign = []} = {}} = useGetCampaigns();

  const listCampaignOptions = useDestructureCampaignOptions({
    campaigns: listCampaign
  });

  const strategyData = useGetDefaultStrategy({
    strategyData: currentStrategy,
    listCampaign: listCampaignOptions,
    listFamily: [],
    listEngine,
    listEngineFirstPrice
  });
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
              <DescriptionStrategy
                goTo={goTo}
                campaignId={campaignId}
                isEdit={isEdit}
                gotoCampaignManagement={gotoCampaignManagement}
                viewOnly={viewOnly}
                currentStrategy={strategyData}
              />
              {/* <div className="pt-2"></div> */}
              {/* <Divider text="Audience"></Divider> */}
              {/* <Audience
                goTo={goTo}
                listAudiences={LIST_AUDIENCES}
                setDataStrategy={setDataStrategy}
                dataStrategy={dataStrategy}
                viewOnly={viewOnly}
              /> */}
              <div className="pt-4"></div>
              <Divider text="Concept"></Divider>
              <Concept
                listConcept={strategyData?.concepts}
                isViewed={viewOnly}
              />
              <div style={{textAlign: 'right'}}>
                <Link
                  to={`/campaigns/${currentStrategy?.campaign_uuid}/strategy/${currentStrategy?.uuid}/edit`}
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
    [
      campaignId,
      currentStrategy?.campaign_uuid,
      currentStrategy?.uuid,
      goTo,
      gotoCampaignManagement,
      isEdit,
      ownerId,
      strategyData,
      t,
      viewOnly
    ]
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

  return (
    <div>
      <PageTitleAlt
        heading={t('strategyDetail')}
        subheading={t('strategyManagerDescription')}
        icon="pe-7s-plane icon-gradient bg-tempting-azure"
      />
      <Container fluid>
        <Tabs items={tabDetail} tab={tabPicker} getTab={getTab} />
      </Container>
    </div>
  );
};

export default StrategyFormDetailView;
