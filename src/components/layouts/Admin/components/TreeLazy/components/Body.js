import React from 'react';
import MUIListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    '&:focus': {
      outline: 'none'
    }
  }
});

const BodyText = ({node, theme}) => (
  <p
    style={theme.bodyTextStyle}
    title={`${node.name} ${node.description ? `(${node.description})` : ''}`}
    className={theme.bodyTextClassName}
  >
    {node.name}
    &nbsp;
    {node.description ? <i>({node.description})</i> : ''}
  </p>
);

const Body = ({theme, node, onClick, onKeyPress}) => {
  const classes = useStyles();

  return (
    <MUIListItemText
      style={theme.bodyStyle}
      className={clsx([theme.bodyClassName, classes.root])}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyPress={onKeyPress}
      primary={<BodyText node={node} theme={theme} />}
    />
  );
};

export default Body;
