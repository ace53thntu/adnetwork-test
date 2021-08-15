import {Typography} from '@material-ui/core';
import {Fragment} from 'react';
import useStyles from './styles';

const Divider = ({text}) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Typography component="span" variant="subtitle2" className={classes.text}>
        {text}
      </Typography>
      <div className={classes.devider}>
        <span></span>
      </div>
    </Fragment>
  );
};

export default Divider;
