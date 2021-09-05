import {makeStyles} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles(
  theme => ({
    chip: {
      color: theme.palette.common.white,
      alignSelf: 'flex-start'
    },
    success: {
      backgroundColor: green[300]
    },
    error: {
      backgroundColor: red[300]
    },
    info: {
      backgroundColor: blue[300]
    },
    warning: {
      backgroundColor: orange[300]
    },
    delete: {
      backgroundColor: red[300]
    },
    draft: {
      backgroundColor: grey[300]
    },
    default: {
      backgroundColor: grey[300]
    },
    noHeader: {
      alignSelf: 'center'
    }
  }),
  {
    name: 'components-status'
  }
);

export default useStyles;
