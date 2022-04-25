import './styles.scss';

import avatar4 from 'assets/utils/images/avatars/avataaars.png';
import React from 'react';
import {useSelector} from 'react-redux';
import {Card} from 'reactstrap';

function AppUser() {
  return (
    <Card className="card-shadow-primary profile-responsive mb-2">
      <div className="dropdown-menu-header">
        <div className="dropdown-menu-header-inner bg-primary">
          <div className="menu-header-content btn-pane-right">
            <PartnerInfo />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default React.memo(AppUser);

function PartnerInfo({partner}) {
  const {enableClosedSidebar} = useSelector(state => state.ThemeOptions);

  return (
    <>
      <div className="avatar-icon-wrapper avatar-icon-lg mr-2">
        <div
          className="avatar-icon rounded btn-hover-shine"
          style={{background: '#fff'}}
        >
          <img
            src={
              partner?.partner_logo
                ? `data:image/jpeg;base64,${partner.partner_logo}`
                : avatar4
            }
            alt="Avatar 5"
          />
        </div>
      </div>
      <div className={enableClosedSidebar ? 'enableClosedSidebar' : ''}>
        <h5 className="menu-header-title text-light">
          {partner?.partner_name ?? window?.ADN_META_DATA?.NAME ?? ''}
        </h5>
      </div>
    </>
  );
}
