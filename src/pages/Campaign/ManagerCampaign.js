//---> Build-in Modules
import React, {Fragment, useMemo, useState} from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Container, CustomInput} from 'reactstrap';
import {useNavigate} from 'react-router-dom';

//---> Internal Modules
import {PageTitleAlt} from 'components/layouts/Admin/components';
import {CampaignList} from './components/campaign-list';
import {StrategyList} from './components/strategy-list';
import {useCampaignManager} from './hooks';
import {useQueryString} from 'hooks';

const ManagerCampaign = ({listAdvertisers}) => {
  const navigate = useNavigate();
  const query = useQueryString();
  const mode = query.get('mode') || 'strategy';
  const {goToCreate, gotoCreateStrategy} = useCampaignManager();
  const [typeView, setTypeView] = useState('');

  const {t} = useTranslation();

  const actionPageTitle = useMemo(
    () => ({
      actions:
        typeView === 'campaign'
          ? t('createNewCampaign')
          : t('createNewStrategy'),
      onClick: typeView === 'campaign' ? goToCreate : gotoCreateStrategy
    }),
    [goToCreate, gotoCreateStrategy, t, typeView]
  );

  React.useEffect(() => {
    if (mode) {
      setTypeView(mode);
    }
  }, [mode, navigate]);

  const onChangeType = type => {
    setTypeView(type);
    navigate(`/campaigns?mode=${type}`);
  };

  const renderTableList = () =>
    typeView === 'campaign' ? <CampaignList /> : <StrategyList />;

  return (
    <Fragment>
      <PageTitleAlt
        heading={
          typeView === 'campaign' ? t('recentCampaign') : t('recentStrategy')
        }
        subheading={t('managementCampaignDescription')}
        {...actionPageTitle}
        icon="pe-7s-speaker icon-gradient bg-tempting-azure"
      />
      <Container fluid>
        <div className="justify-content-end d-flex mb-3">
          <CustomInput
            onClick={() => onChangeType('campaign')}
            type="radio"
            id={'campaign'}
            label={t('viewByCampaign')}
            className="mr-4"
            defaultChecked={typeView === 'campaign'}
            name="view_mode"
            checked={typeView === 'campaign'}
          />
          <CustomInput
            onClick={() => onChangeType('strategy')}
            type="radio"
            id={'strategy'}
            label={t('viewByStrategy')}
            defaultChecked={typeView === 'strategy'}
            checked={typeView === 'strategy'}
            name="view_mode"
          />
        </div>
        {renderTableList()}
      </Container>
    </Fragment>
  );
};

export default React.memo(ManagerCampaign);
