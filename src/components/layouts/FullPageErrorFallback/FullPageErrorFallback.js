import React from 'react';
import {Button} from 'reactstrap';

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: theme.palette.error.main,
    height: 'calc(100vh - 60px)'
  }
}));

export function FullPageErrorFallback({error, resetErrorBoundary}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <Button
        // onClick={() => resetErrorBoundary()}
        onClick={() => window.location.reload()}
        color="primary"
        className="mb-2"
      >
        Try again
      </Button>
      {/* <pre>{error?.message ?? error ?? null}</pre> */}
    </div>
  );
}
