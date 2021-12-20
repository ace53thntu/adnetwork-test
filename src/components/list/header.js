import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
function Header(props) {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      className="font-weight-bold"
    >
      {props.text}
    </Typography>
  );
}

Header.propTypes = {
  text: PropTypes.string.isRequired
};

export default Header;
