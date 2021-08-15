//---> Build-in Modules
import React, {Fragment, useMemo, useState} from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Container, CustomInput, ListGroup, ListGroupItem} from 'reactstrap';
import {useNavigate} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';

//---> Internal Modules
import {colorStatus, generateClassName} from './common';
import {useCampaignManager} from './hook';
import {useGetStrategies} from './hooks';
import {useDestructureCampaigns} from './hooks/useDestructureCampaigns';
import {PageTitleAlt} from 'components/layouts/Admin/components';
import DialogConfirm from 'components/common/DialogConfirm';
// import {DialogConfirm} from 'components';
// import {useGetCampaigns} from 'core/queries/campaigns';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'center',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
));

const ManagerCampaign = ({listAdvertisers}) => {
  const navigate = useNavigate();
  const {
    goToCreate,
    goToEditStrategy,
    goToEditCampaign,
    goToViewStrategy
  } = useCampaignManager();
  // const {data: campaignsResp} = useGetCampaigns({mode: 'details'});
  const campaignsResp = [];
  const strategies = useGetStrategies({
    advertisers: listAdvertisers,
    campaigns: campaignsResp
  });
  const campaigns = useDestructureCampaigns({
    advertisers: listAdvertisers,
    campaigns: campaignsResp
  });

  const [cpAnchorEl, setCpAnchorEl] = useState(null);
  const [strAnchorEl, setStrAnchorEl] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [titleDialog, setTitleDialog] = useState('');
  const [currentCampaign, setCurrentCampaign] = useState(null);
  const [currentStrategy, setCurrentStrategy] = useState(null);
  const [typeView, setTypeView] = useState('strategy');

  const {t} = useTranslation();

  const actionPageTitle = useMemo(
    () => ({
      actions: t('createNewCampaign'),
      onClick: goToCreate
    }),
    [goToCreate, t]
  );

  const onChangeType = type => {
    setTypeView(type);
    navigate(`/campaigns?mode=${type}`);
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  const onRemoveData = ({id, title, type, action}) => {
    setOpenConfirmDialog(true);
    setTitleDialog(title);
  };

  const handleSubmitDelete = () => {};

  const handleOpenMenuCampaign = (event, id) => {
    setCpAnchorEl(event.currentTarget);
    setCurrentCampaign(id);
  };

  const handleOpenMenuStrategy = (event, id, campaignId) => {
    event.preventDefault();
    setStrAnchorEl(event.currentTarget);
    setCurrentStrategy({id, campaignId});
  };

  const handleCloseMenuCampaign = () => {
    setCpAnchorEl(null);
    setCurrentCampaign(null);
  };

  const handleCloseMenuStrategy = () => {
    setStrAnchorEl(null);
    setCurrentCampaign(null);
  };

  const renderTitle = (title, data) => (
    <div className="widget-content-left2 flex2">
      <div className="widget-heading">{title}</div>
      <div className="widget-subheading opacity-10">
        <span className="pr-2">
          <b>{data}</b>
        </span>
      </div>
    </div>
  );

  const renderCampaignView = (campaignItem, campIdx) => {
    const {advertiserName, name, id, status} = campaignItem;
    return (
      <ListGroupItem
        className={`mb-2 border border-${
          colorStatus[status || 'active'].classBorder
        }`}
      >
        <div className="widget-content p-0">
          <div className="widget-content-wrapper align-items-start">
            {renderTitle(t('advertiser'), advertiserName || `No name`)}
            {renderTitle(t('campaign'), name || `No name`)}
            <div className="widget-content-left2 flex2">
              <div className="widget-heading">{t('status')}</div>
              <div className="widget-subheading opacity-10">
                <div
                  className={`badge badge-${
                    colorStatus[status || 'active'].class
                  } mr-2`}
                >
                  {colorStatus[status || 'active'].name || <b></b>}
                </div>
              </div>
            </div>
            <div className="widget-content-right2">
              <IconButton
                edge="end"
                aria-controls="setting-action-menu"
                aria-haspopup="true"
                onClick={event => handleOpenMenuCampaign(event, id)}
              >
                <SettingsIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </ListGroupItem>
    );
  };

  const renderStrategyView = (_strategies = []) =>
    _strategies.map((strategy, indStg) => {
      const {
        advertiserName,
        campaignName,
        strategyId,
        strategyName,
        status,
        process,
        campaignId
      } = strategy;
      return (
        <ListGroupItem
          key={`pr-${strategyId}`}
          className={`mb-2 border border-${
            colorStatus[strategy.status || 'active'].classBorder
          }`}
        >
          <div className="widget-content p-0">
            <div className="widget-content-wrapper  align-items-start">
              {renderTitle(t('advertiser'), advertiserName || `No name`)}
              {renderTitle(t('campaign'), campaignName || `No name`)}
              {renderTitle(t('strategy'), strategyName)}
              <div className="widget-content-left2 flex2">
                <div className="widget-heading">{t('status')}</div>
                <div className="widget-subheading opacity-10">
                  <div
                    className={`badge badge-${
                      colorStatus[status || 'active'].class
                    } mr-2`}
                  >
                    {colorStatus[status || 'active'].name || <b></b>}
                  </div>
                </div>
              </div>

              {/* TODO: Show after finish API metrics */}
              <div className="widget-content-left2 flex2 d-none">
                <div className="widget-heading">{t('process')}</div>
                <div className="widget-subheading opacity-10">
                  <span>
                    <b className={`text-${generateClassName(process || 0)}`}>
                      {process || 0}%
                    </b>
                  </span>
                </div>
              </div>

              <div className="widget-content-right2">
                <div className="widget-subheading opacity-10">
                  <IconButton
                    edge="end"
                    aria-controls="setting-action-menu"
                    aria-haspopup="true"
                    onClick={event =>
                      handleOpenMenuStrategy(event, strategyId, campaignId)
                    }
                  >
                    <SettingsIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        </ListGroupItem>
      );
    });

  const renderTableList = (_campaigns = [], _strategies = []) => {
    return typeView === 'campaign' ? (
      _campaigns.map((campaignItem, campIdx) => {
        return (
          <Fragment key={`pr-${campIdx}`}>
            {renderCampaignView(campaignItem, campIdx)}
            <StyledMenu
              id="simple-campaign-menu"
              anchorEl={cpAnchorEl}
              keepMounted
              open={Boolean(cpAnchorEl)}
              onClose={handleCloseMenuCampaign}
            >
              <MenuItem onClick={() => goToEditCampaign(currentCampaign)}>
                Edit
              </MenuItem>
              <MenuItem
                onClick={() =>
                  onRemoveData({
                    id: currentCampaign,
                    title: 'Are you sure to hide this campaign',
                    type: 'campaign',
                    action: 'hide'
                  })
                }
              >
                Hide
              </MenuItem>
              <MenuItem
                onClick={() =>
                  onRemoveData({
                    id: currentCampaign,
                    title: 'Are you sure to delete this campaign',
                    type: 'campaign',
                    action: 'delete'
                  })
                }
              >
                Delete
              </MenuItem>
            </StyledMenu>
          </Fragment>
        );
      })
    ) : (
      <Fragment>
        {renderStrategyView(strategies)}
        <StyledMenu
          id="strategy-menu"
          anchorEl={strAnchorEl}
          keepMounted
          open={Boolean(strAnchorEl)}
          onClose={handleCloseMenuStrategy}
        >
          <MenuItem onClick={() => goToViewStrategy(currentStrategy)}>
            View
          </MenuItem>
          <MenuItem onClick={() => goToEditStrategy(currentStrategy)}>
            Edit
          </MenuItem>
          <MenuItem
            onClick={() =>
              onRemoveData({
                id: currentStrategy,
                title: 'Are you sure to delete this Strategy',
                type: 'strategy',
                action: 'delete'
              })
            }
          >
            Delete
          </MenuItem>
        </StyledMenu>
      </Fragment>
    );
  };

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
            name="customRadio"
          />
          <CustomInput
            onClick={() => onChangeType('strategy')}
            type="radio"
            id={'strategy'}
            label={t('viewByStrategy')}
            defaultChecked={typeView === 'strategy'}
            name="customRadio"
          />
        </div>
        <ListGroup flush>
          {campaigns && campaigns.length ? (
            renderTableList(campaigns, strategies)
          ) : (
            <ListGroupItem>
              <div>
                <strong>{t('noCampaign')}</strong>
              </div>
            </ListGroupItem>
          )}
        </ListGroup>
        <DialogConfirm
          open={openConfirmDialog}
          title={titleDialog}
          handleClose={handleCancelDelete}
          handleAgree={handleSubmitDelete}
        />
      </Container>
    </Fragment>
  );
};

export default ManagerCampaign;
