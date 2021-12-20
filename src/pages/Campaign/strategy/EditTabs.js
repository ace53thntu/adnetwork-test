//---> Build-in Modules
import React, {useCallback, useEffect, useMemo, useState} from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';

//---> Internal Modules

import {useQueryString} from 'hooks';
import {useGetCampaigns} from 'queries/campaign';
import StrategyForm from './form';
import {Tabs} from '../components';
import {useCampaignManager, useDestructureCampaignOptions} from '../hooks';
import Concept from './form-fields/Concept';
import Summary from './form-fields/Summary';

const StrategyEditTabs = ({currentStrategy = {}, campaignId}) => {
  const {data: listCampaign = []} = useGetCampaigns();
  const listCampaignOptions = useDestructureCampaignOptions({
    campaigns: listCampaign?.items
  });
  const query = useQueryString();
  const nextTab = query.get('next_tab');

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
            <StrategyForm
              campaignId={campaignId}
              isEdit
              currentStrategy={currentStrategy}
              gotoCampaignManagement={gotoCampaignManagement}
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
              <Concept goTo={goTo} t={t} strategyData={currentStrategy} />
            </div>
          )
        },
        {
          name: 'Summary',
          content: (
            <div>
              <Summary
                campaignId={campaignId}
                isEdit
                currentStrategy={currentStrategy}
                gotoCampaignManagement={gotoCampaignManagement}
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
      currentStrategy,
      gotoCampaignManagement,
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

  return <Tabs items={tabDetail} tab={tabPicker} getTab={getTab} />;
};

export default StrategyEditTabs;
