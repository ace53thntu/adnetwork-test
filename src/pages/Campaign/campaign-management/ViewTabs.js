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
import {CappingReferenceTypes} from 'constants/misc';
import CampaignStrategies from './strategies';

const TabIndexes = {
  DESCRIPTION: 0,
  STRATEGY: 1,
  CAPPING: 2,
  REPORT: 3
};

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
          name: t('strategy'),
          content: (
            <CampaignStrategies
              goToTab={goToTab}
              strategies={currentCampaign?.strategies}
            />
          )
        },
        {
          name: t('capping'),
          content: (
            <Capping
              referenceUuid={currentCampaign?.uuid}
              referenceType={CappingReferenceTypes.CAMPAIGN}
            />
          )
        },
        {
          name: t('report'),
          content: (
            <EntityReport
              entity={EntityTypes.CAMPAIGN}
              entityName={currentCampaign?.name}
              parentPath={currentCampaign?.advertiser_uuid?.label}
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
      case TabIndexes.DESCRIPTION:
        setCurrentTab('description');
        break;
      case TabIndexes.STRATEGY:
        setCurrentTab('strategies');
        break;
      case TabIndexes.CAPPING:
        setCurrentTab('capping');
        break;
      case TabIndexes.REPORT:
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
        return TabIndexes.DESCRIPTION;
      case 'strategies':
        return TabIndexes.STRATEGY;
      case 'capping':
        return TabIndexes.CAPPING;
      case 'report':
        return TabIndexes.REPORT;
      default:
        return TabIndexes.DESCRIPTION;
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
