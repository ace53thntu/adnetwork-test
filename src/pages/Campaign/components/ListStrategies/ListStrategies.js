//---> Build-in modules
import React, {useState} from 'react';

//---> External modules
import {ListGroupItem} from 'reactstrap';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {useTranslation} from 'react-i18next';

//---> Internal modules
import {colorStatus, generateClassName} from 'pages/Campaign/common';
import DialogConfirm from 'components/common/DialogConfirm';
import {useCampaignManager} from 'pages/Campaign/hooks';

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

const ListStrategies = ({strategies = []}) => {
  const {t} = useTranslation();

  const {goToEditStrategy, goToViewStrategy} = useCampaignManager();
  const [strAnchorEl, setStrAnchorEl] = useState(null);
  const [currentStrategy, setCurrentStrategy] = useState(null);

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [titleDialog, setTitleDialog] = useState('');

  const handleOpenMenu = (event, id, campaignId) => {
    event.preventDefault();
    setStrAnchorEl(event.currentTarget);
    setCurrentStrategy({id, campaignId});
  };

  const handleCloseMenuStrategy = () => {
    setStrAnchorEl(null);
    setCurrentStrategy(null);
  };

  const onRemoveData = ({id, title, type, action}) => {
    setOpenConfirmDialog(true);
    setTitleDialog(title);
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  const handleSubmitDelete = () => {};

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

  return (
    <>
      {strategies?.map((strategy, indStg) => {
        const {
          id: strategyId,
          name: strategyName,
          status,
          process,
          campaign_id: campaignId
        } = strategy;
        return (
          <ListGroupItem
            key={`pr-${indStg}`}
            className={`mb-2 border border-${
              colorStatus[strategy.status || 'active'].classBorder
            }`}
          >
            <div className="widget-content p-0">
              <div className="widget-content-wrapper  align-items-start">
                {/* {renderTitle(t('advertiser'), advertiserName || `No name`)}
                {renderTitle(t('campaign'), campaignName || `No name`)} */}
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
                        handleOpenMenu(event, strategyId, campaignId)
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
      })}
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
      <DialogConfirm
        open={openConfirmDialog}
        title={titleDialog}
        handleClose={handleCancelDelete}
        handleAgree={handleSubmitDelete}
      />
    </>
  );
};

export default ListStrategies;
