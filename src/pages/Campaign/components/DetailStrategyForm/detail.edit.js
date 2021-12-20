//---> Build-in Modules
import React, {useCallback, useEffect, useMemo, useState} from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Container} from 'reactstrap';

//---> Internal Modules
import {PageTitleAlt} from 'components/layouts/Admin/components';
import {Tabs} from '..';
import {
  useCampaignManager,
  useDestructureCampaignOptions,
  usePositionOptions
} from '../../hooks';
import {useGetDefaultStrategy} from '../../hooks/useGetDefaultStrategy';
import Concept from '../../strategy/form-fields/Concept';
import DescriptionStrategy from './DescriptionStrategy';
import Summary from '../../strategy/form-fields/Summary';
import {useQueryString} from 'hooks';
import {useGetCampaigns} from 'queries/campaign';
// import {useGetCampaigns} from 'core/queries';

const StrategyFormDetailEdit = ({
  isEdit = false,
  currentStrategy = {},
  campaignId,
  viewOnly
}) => {
  const {data: listCampaign = []} = useGetCampaigns();
  const listCampaignOptions = useDestructureCampaignOptions({
    campaigns: listCampaign?.items
  });
  const positions = usePositionOptions();
  const query = useQueryString();
  const nextTab = query.get('next_tab');

  const strategyData = useGetDefaultStrategy({
    strategyData: currentStrategy,
    listCampaign: listCampaignOptions,
    positions
  });

  const {t} = useTranslation();
  const {gotoCampaignManagement} = useCampaignManager();

  const [currentTab, setCurrentTab] = useState('description');

  const goTo = useCallback(({nextTab}) => {
    setCurrentTab(nextTab);
  }, []);

  useEffect(() => {
    if (nextTab) {
      goTo({nextTab});
    }
  }, [goTo, nextTab]);

  const tabDetail = useMemo(
    () =>
      [
        {
          name: t('description'),
          content: (
            <DescriptionStrategy
              campaignId={campaignId}
              isEdit={isEdit}
              currentStrategy={strategyData}
              gotoCampaignManagement={gotoCampaignManagement}
              viewOnly={viewOnly}
              listCampaignOptions={listCampaignOptions}
              goTo={goTo}
            />
          )
        },
        // {
        //   name: 'Audience',
        //   content: (
        //     <div>
        //       <Audience
        //         listAudiences={LIST_AUDIENCES}
        //         goTo={goTo}
        //         strategyData={strategyData}
        //       />
        //     </div>
        //   )
        // },
        {
          name: 'Concept',
          content: (
            <div>
              <Concept goTo={goTo} t={t} strategyData={strategyData} />
            </div>
          )
        },
        {
          name: 'Summary',
          content: (
            <div>
              <Summary
                campaignId={campaignId}
                isEdit={isEdit}
                currentStrategy={strategyData}
                gotoCampaignManagement={gotoCampaignManagement}
                viewOnly={viewOnly}
                listCampaignOptions={listCampaignOptions}
                goTo={goTo}
              />
            </div>
          )
        }
      ].map(({name, content}, index) => ({
        key: index,
        title: name,
        getContent: () => content
      })),
    [
      t,
      goTo,
      campaignId,
      isEdit,
      strategyData,
      gotoCampaignManagement,
      viewOnly,
      listCampaignOptions
    ]
  );

  const getTab = index => {
    switch (index) {
      case 0:
        setCurrentTab('description');
        break;
      // case 1:
      //   setCurrentTab('audience');
      //   break;
      case 2:
        setCurrentTab('concept');
        break;
      case 3:
        setCurrentTab('summary');
        break;
      default:
        break;
    }
  };

  const tabPicker = useCallback(() => {
    switch (currentTab) {
      case 'description':
        return 0;
      // case 'audience':
      //   return 1;
      case 'concept':
        return 2;
      case 'summary':
        return 3;
      default:
        return 1;
    }
  }, [currentTab]);

  return (
    <div>
      <PageTitleAlt
        heading={isEdit ? t('strategyDetail') : t('createStrategy')}
        subheading={t('strategyManagerDescription')}
        icon="pe-7s-plane icon-gradient bg-tempting-azure"
      />
      <Container fluid>
        <Tabs items={tabDetail} tab={tabPicker} getTab={getTab} />
      </Container>
    </div>
  );
};

export default StrategyFormDetailEdit;
