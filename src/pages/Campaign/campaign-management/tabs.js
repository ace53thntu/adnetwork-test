import {EntityTypes} from 'constants/report';
import {EntityReport} from 'pages/entity-report';
import {USER_ROLE} from 'pages/user-management/constants';
//---> External Modules
import PropTypes from 'prop-types';
//---> Build-in Modules
import React, {useCallback, useMemo, useState} from 'react';
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
  const ownerId = currentCampaign?.advertiser_uuid?.value;
  const entityId = currentCampaign?.uuid;
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
          name: isView ? t('report') : t('strategy'),
          content: isView ? (
            <EntityReport
              entity={EntityTypes.CAMPAIGN}
              entityId={entityId}
              ownerId={ownerId}
              ownerRole={USER_ROLE.ADVERTISER}
            />
          ) : (
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
    [
      t,
      goToTab,
      isEdit,
      isCreate,
      isView,
      currentCampaign,
      entityId,
      ownerId,
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

CampaignTabs.propTypes = propTypes;

export default CampaignTabs;
