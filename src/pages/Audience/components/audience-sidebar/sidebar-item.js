import React from 'react';

import PropTypes from 'prop-types';

import {SidebarItemStyled} from './styled';

const propTypes = {
  audience: PropTypes.object,
  isActive: PropTypes.bool,
  onClickItem: PropTypes.func
};

const SidebarItem = ({audience, isActive, onClickItem = () => null}) => {
  return (
    <SidebarItemStyled
      key={`pr-${audience?.uuid}`}
      active={isActive}
      action
      href="#"
      tag="a"
      onClick={onClickItem}
      title={audience?.name || 'No name'}
    >
      {audience?.name || 'No name'}
    </SidebarItemStyled>
  );
};

SidebarItem.propTypes = propTypes;

export default React.memo(SidebarItem);
