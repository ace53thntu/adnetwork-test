import React from 'react';
import PropTypes from 'prop-types';
import {ErrorMessageStyled} from './styled';

const propTypes = {
  message: PropTypes.string.isRequired
};

const ErrorMessage = ({message = ''}) => {
  return <ErrorMessageStyled>{message}</ErrorMessageStyled>;
};

ErrorMessage.propTypes = propTypes;

export default React.memo(ErrorMessage);
