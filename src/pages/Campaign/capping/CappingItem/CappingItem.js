//---> Build-in Modules
import React, {useState} from 'react';

//---> External Modules
import {ListGroupItem} from 'reactstrap';
import {IconButton, MenuItem} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import {Menu} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

//---> Internal Modules
import useHandleCapping from '../hooks/useHandleCapping';
import {colorStatus} from 'pages/Campaign/common';
import DialogConfirm from 'components/common/DialogConfirm';

//---> Menu Styled
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

// Main Component
const CappingItem = ({capping = null}) => {
  const {
    titleDialog,
    openConfirmDialog,
    handleEdit,
    handleDelete,
    handleCancelDelete,
    handleSubmitDelete
  } = useHandleCapping();
  const [cpAnchorEl, setCpAnchorEl] = useState(null);

  const handleOpenMenuCapping = evt => {
    evt.preventDefault();
    setCpAnchorEl(evt.currentTarget);
  };

  const handleCloseMenuCampaign = () => {
    setCpAnchorEl(null);
  };

  const renderTitle = (title, data) => (
    <div className="widget-content-left2 flex2">
      <div className="widget-heading">{title}</div>
      <div className="widget-subheading opacity-10">
        <span className="pr-2">{data}</span>
      </div>
    </div>
  );

  return (
    <>
      <ListGroupItem
        key={capping.id}
        className={`mb-2 border border-${
          colorStatus[capping.type === 'capping' ? 'active' : 'completed']
            .classBorder
        }`}
      >
        <div className="widget-content p-0">
          <div className="widget-content-wrapper  align-items-start">
            {/* {renderTitle('Campaign', capping?.campaign?.name)}
            {renderTitle('Strategy', capping?.strategy?.name)} */}
            {renderTitle('Capping Type', capping?.ctype)}
            {renderTitle('Time Frame', capping?.time_frame)}
            {renderTitle('Limit', capping?.climit)}
            <div className="widget-content-left2 flex2">
              <div className="widget-heading">Smooth</div>
              {capping.type === 'capping' ? (
                <div className="widget-subheading opacity-10">
                  <div
                    className={`badge badge-${
                      colorStatus[capping.smooth ? 'active' : 'pending'].class
                    } mr-2`}
                  >
                    {capping.smooth ? 'True' : 'False'}
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
            {renderTitle('Week Days', capping?.week_days)}
            {renderTitle('Start Hour', capping?.start_hour)}
            {renderTitle('Start Minute', capping?.start_minute)}
            {renderTitle('End Hour', capping?.end_hour)}
            {renderTitle('End Minute', capping?.end_minute)}

            {renderTitle('Type', capping?.type)}

            <div className="widget-content-right2">
              <div className="widget-subheading opacity-10">
                <IconButton
                  edge="end"
                  aria-controls="setting-action-menu"
                  aria-haspopup="true"
                  onClick={event => handleOpenMenuCapping(event, capping.id)}
                >
                  <SettingsIcon />
                </IconButton>
                <StyledMenu
                  id="capping-menu"
                  anchorEl={cpAnchorEl}
                  keepMounted
                  open={Boolean(cpAnchorEl)}
                  onClose={handleCloseMenuCampaign}
                >
                  <MenuItem
                    onClick={() =>
                      handleEdit({type: capping?.type, id: capping?.uuid})
                    }
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleDelete({
                        type: capping?.type,
                        id: capping?.uuid,
                        title: capping?.typeText
                      })
                    }
                  >
                    Delete
                  </MenuItem>
                </StyledMenu>
              </div>
            </div>
          </div>
        </div>
      </ListGroupItem>
      {openConfirmDialog && (
        <DialogConfirm
          open={openConfirmDialog}
          title={titleDialog}
          handleClose={handleCancelDelete}
          handleAgree={handleSubmitDelete}
        />
      )}
    </>
  );
};

export default CappingItem;
