import {useAuth} from 'context/auth/hooks';
import * as React from 'react';
import {Navigate, Link as RouterLink} from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {CEO} from '../CEO';
import {useStyles} from './NotFound.styles';

function NotFound(props) {
  const classes = useStyles();
  const {
    state: {isAuthenticated}
  } = useAuth();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  if (!isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  return (
    <CEO className={classes.root} title="Not found">
      <Typography align="center" variant={mobileDevice ? 'h4' : 'h1'}>
        404: The page you are looking for isn’t here
      </Typography>
      <Typography align="center" variant="subtitle2">
        You either tried some shady route or you came here by mistake. Whichever
        it is, try using the navigation
      </Typography>
      <div className={classes.imageContainer}>
        <img
          alt="Under development"
          className={classes.image}
          src="/images/undraw_page_not_found_su7k.svg"
        />
      </div>
      <div className={classes.buttonContainer}>
        <Button
          color="primary"
          component={RouterLink}
          to="/"
          variant="outlined"
        >
          Back to home
        </Button>
      </div>
    </CEO>
  );
}

export {NotFound};
