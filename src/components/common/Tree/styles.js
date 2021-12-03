import {makeStyles} from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    height: 400,
    overflow: 'auto',
    padding: 10
  },

  rootAudience: {
    minHeight: 140,
    // minHeight: 140,
    overflowY: 'auto',
    padding: '0px 10px',
    marginTop: 10,
    maxHeight: 'calc(100vh - 535px)'
  }
}));
