import React from 'react';
import MUIList from '@material-ui/core/List';

const List = ({theme, children}) => (
  <MUIList style={theme.listStyle} className={theme.listClassName}>
    {children}
  </MUIList>
);

export default List;
