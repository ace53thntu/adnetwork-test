import React from 'react';

import MUIListItem from '@material-ui/core/ListItem';

const ListItem = ({
  theme,
  onClick,
  onKeyPress,
  children,
  onDoubleClick,
  selected,
  node
}) => {
  React.useLayoutEffect(() => {
    if (selected) {
      document
        .getElementById(node.id)
        .scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  }, [node.id, selected]);

  return (
    <MUIListItem
      button
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onKeyPress={onKeyPress}
      style={theme.listItemStyle}
      className={theme.listItemClassName}
      selected={selected}
      id={node.id}
    >
      {children}
    </MUIListItem>
  );
};

export default ListItem;
