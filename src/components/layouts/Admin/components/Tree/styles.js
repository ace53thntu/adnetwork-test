import {makeStyles} from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    height: 400,
    overflow: 'auto',
    padding: 10
  },

  rootAudience: {
    height: 140,
    overflow: 'auto',
    padding: '0px 10px',
    marginTop: 10
  }
}));
