//---> Build-in Modules
import React, {useCallback, useMemo, useState} from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';

//---> Internal Modules
import {Tabs} from '../components';
import {Capping} from '../components/capping';
import CampaignForm from './form';
import {EntityTypes} from 'constants/report';
import {EntityReport} from 'pages/entity-report';
import {USER_ROLE} from 'pages/user-management/constants';

const propTypes = {
  currentCampaign: PropTypes.any
};

const CampaignViewTabs = ({currentCampaign = null}) => {
  const {t} = useTranslation();
  const ownerId = currentCampaign?.advertiser_uuid?.value;
  const entityId = currentCampaign?.uuid;
  const [currentTab, setCurrentTab] = useState('description');

  const goToTab = useCallback(({nextTab}) => {
    setCurrentTab(nextTab);
  }, []);

  const tabDetail = useMemo(
    () =>
      [
        {
          name: t('description'),
          content: (
            <CampaignForm
              goToTab={goToTab}
              isView
              currentCampaign={currentCampaign}
            />
          )
        },
        {
          name: t('capping'),
          content: <Capping referenceUuid={currentCampaign?.uuid} />
        },
        {
          name: t('report'),
          content: (
            <EntityReport
              entity={EntityTypes.CAMPAIGN}
              entityId={entityId}
              ownerId={ownerId}
              ownerRole={USER_ROLE.ADVERTISER}
            />
          )
        }
      ].map(({name, content}, index) => ({
        key: index,
        title: name,
        getContent: () => content
      })),
    [t, goToTab, currentCampaign, entityId, ownerId]
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
        setCurrentTab('description');
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
      <Tabs items={tabDetail} tab={tabPicker} getTab={getTab} />
    </div>
  );
};

CampaignViewTabs.propTypes = propTypes;

export default CampaignViewTabs;
