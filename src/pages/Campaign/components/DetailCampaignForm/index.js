//---> Build-in Modules
import React, {useMemo, useCallback, useState} from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';

//---> Internal Modules
import {Tabs} from '..';
import DescriptionCampaign from './DescriptionCampaign';
import Strategies from './Strategies';

const CampaignDetails = ({
  isEdit,
  currentCampaign,
  listAdvertisers,
  campaignTree,
  advertiserId,
  labelsData
}) => {
  const {t} = useTranslation();
  const [currentTab, setCurrentTab] = useState('description');
  const [campaignIdCreated, setCampaignIdCreated] = useState('');

  const goToTab = useCallback(({nextTab, campaignIdCreated}) => {
    setCurrentTab(nextTab);
    setCampaignIdCreated(campaignIdCreated);
  }, []);

  const tabDetail = useMemo(
    () =>
      [
        {
          name: t('description'),
          content: (
            <DescriptionCampaign
              goToTab={goToTab}
              isEdit={isEdit}
              currentCampaign={currentCampaign}
              listAdvertisers={listAdvertisers}
              campaignTree={campaignTree}
              advertiserId={advertiserId}
              labelsData={labelsData}
            />
          )
        },
        {
          name: t('strategy'),
          content: (
            <Strategies
              goToTab={goToTab}
              campaignIdCreated={campaignIdCreated}
              strategies={currentCampaign?.strategies}
            />
          )
        }
      ].map(({name, content}, index) => ({
        key: index,
        title: name,
        getContent: () => content
      })),
    [
      t,
      goToTab,
      isEdit,
      currentCampaign,
      listAdvertisers,
      campaignTree,
      advertiserId,
      labelsData,
      campaignIdCreated
    ]
  );

  const getTab = index => {
    switch (index) {
      case 0:
        setCurrentTab('description');
        break;
      case 1:
        setCurrentTab('strategies');
        break;
      default:
        break;
    }
  };

  const tabPicker = useCallback(() => {
    switch (currentTab) {
      case 'description':
        return 0;
      default:
        return 1;
    }
  }, [currentTab]);
  return (
    <div>
      <Tabs items={tabDetail} tab={tabPicker} getTab={getTab} />
    </div>
  );
};

export default CampaignDetails;
