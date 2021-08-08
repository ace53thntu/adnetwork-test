import i18n from 'context/i18n';
import React, {Fragment, useState} from 'react';
import Flag from 'react-flagkit';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';

const HeaderDots = props => {
  const [activeLanguage, setActiveLanguage] = useState('en');

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
    setActiveLanguage(lng);
  };

  return (
    <Fragment>
      <div className="header-dots">
        <UncontrolledDropdown>
          <DropdownToggle className="p-0 mr-2" color="link">
            <div className="icon-wrapper icon-wrapper-alt rounded-circle">
              <div className="icon-wrapper-bg bg-focus" />
              <div className="language-icon">
                <Flag
                  className="mr-3 opacity-8"
                  country={activeLanguage === 'en' ? 'US' : 'VN'}
                  size="40"
                />
              </div>
            </div>
          </DropdownToggle>
          <DropdownMenu right className="rm-pointers">
            <DropdownItem
              active={activeLanguage === 'en'}
              onClick={() => changeLanguage('en')}
            >
              <Flag className="mr-3 opacity-8" country="US" />
              English
            </DropdownItem>
            <DropdownItem
              active={activeLanguage === 'vn'}
              onClick={() => changeLanguage('vn')}
            >
              <Flag className="mr-3 opacity-8" country="VN" />
              Tiếng Việt
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </Fragment>
  );
};

export default HeaderDots;
