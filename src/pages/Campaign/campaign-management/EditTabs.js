//---> External Modules
import {RoutePaths} from 'constants/route-paths';
import {useQueryString} from 'hooks';
import PropTypes from 'prop-types';
//---> Build-in Modules
import React, {useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';

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

const CampaignEditTabs = ({
  isView = false,
  isEdit = false,
  isCreate = false,
  currentCampaign = null
}) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const query = useQueryString();
  const nextTab = query.get('next_tab');
  const [currentTab, setCurrentTab] = useState('description');
  const [campaignIdCreated, setCampaignIdCreated] = useState('');

  React.useEffect(() => {
    if (nextTab) {
      setCurrentTab(nextTab);
    }
  }, [nextTab]);

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
    const url = `/${RoutePaths.CAMPAIGN}/${currentCampaign?.uuid}/${RoutePaths.EDIT}?advertiser_id=${currentCampaign?.advertiser_uuid?.value}&next_tab=`;

    switch (index) {
      case 0:
        // setCurrentTab('description');
        navigate(`${url}description`);
        break;
      case 1:
        // setCurrentTab('strategies');
        navigate(`${url}strategies`);

        break;
      default:
        break;
    }
  };

  const tabPicker = useCallback(() => {
    switch (currentTab) {
      case 'description':
        return 0;
      case 'strategies':
        return 1;
      default:
        return 0;
    }
  }, [currentTab]);
  return (
    <div>
      <Tabs
        items={tabDetail}
        tab={tabPicker}
        getTab={getTab}
        isCreate={isCreate}
      />
    </div>
  );
};

CampaignEditTabs.propTypes = propTypes;

export default CampaignEditTabs;
