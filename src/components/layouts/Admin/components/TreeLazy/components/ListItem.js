import MUIListItem from '@material-ui/core/ListItem';
import React from 'react';

const ListItem = ({
  theme,
  onClick,
  onKeyPress,
  children,
  onDoubleClick,
  selected
}) => (
  <MUIListItem
    button
    onClick={onClick}
    onDoubleClick={onDoubleClick}
    onKeyPress={onKeyPress}
    style={theme.listItemStyle}
    className={theme.listItemClassName}
    selected={selected}
  >
    {children}
  </MUIListItem>
);

export default ListItem;
