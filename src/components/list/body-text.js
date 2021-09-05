import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import {useListStyles} from './styles';

function BodyText(props) {
  const {noHeader, noTruncate} = props;
  const classes = useListStyles();

  return (
    <Typography
      variant={noHeader ? 'h5' : 'body1'}
      className={noTruncate ? '' : classes.bodyText}
    >
      {props.text}
    </Typography>
  );
}

BodyText.propTypes = {
  text: PropTypes.string.isRequired,
  noHeader: PropTypes.bool,
  noTruncate: PropTypes.bool
};

BodyText.defaultProps = {
  noHeader: false,
  noTruncate: false
};

export default BodyText;
