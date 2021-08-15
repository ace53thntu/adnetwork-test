import React from 'react';
import MUIListItem from '@material-ui/core/ListItem';
import MUIListItemText from '@material-ui/core/ListItemText';
import MUITypography from '@material-ui/core/Typography';

const Typography = ({theme}) => (
  <MUITypography
    style={theme.paginatorTextStyle}
    className={theme.paginatorTextClassName}
  >
    Load More
  </MUITypography>
);

const Paginator = ({theme, onClick, onKeyPress}) => (
  <MUIListItem
    button
    onClick={onClick}
    onKeyPress={onKeyPress}
    style={theme.paginatorStyle}
    className={theme.paginatorClassName}
  >
    <MUIListItemText disableTypography primary={<Typography theme={theme} />} />
  </MUIListItem>
);

export default Paginator;
