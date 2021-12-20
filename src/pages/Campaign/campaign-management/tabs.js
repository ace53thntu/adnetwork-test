//---> Build-in Modules
import React, {useMemo, useCallback, useState} from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';

//---> Internal Modules
import {Tabs} from '../components';
import CampaignForm from './form';
import CampaignStrategies from './strategies';

const propTypes = {
  isView: PropTypes.bool,
  isEdit: PropTypes.bool,
  isCreate: PropTypes.bool,
  currentCampaign: PropTypes.any
};

const CampaignTabs = ({
  isView = false,
  isEdit = false,
  isCreate = false,
  currentCampaign = null
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
            <CampaignForm
              goToTab={goToTab}
              isEdit={isEdit}
              isCreate={isCreate}
              isView={isView}
              currentCampaign={currentCampaign}
            />
          )
        },
        {
          name: t('strategy'),
          content: (
            <CampaignStrategies
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
    [t, goToTab, isEdit, isCreate, isView, currentCampaign, campaignIdCreated]
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

CampaignTabs.propTypes = propTypes;

export default CampaignTabs;
