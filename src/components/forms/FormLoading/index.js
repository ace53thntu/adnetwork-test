import React from 'react';
import {CircularProgress, Fade, Typography} from '@material-ui/core';
import {FormLoadingStyled} from './styled';

export default function FormLoading({
  loadingText = 'Loading...',
  isLoading = false
}) {
  return (
    <FormLoadingStyled>
      <Fade in={isLoading} unmountOnExit>
        <CircularProgress />
      </Fade>
      <Typography>{loadingText}</Typography>
    </FormLoadingStyled>
  );
}
