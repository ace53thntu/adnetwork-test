import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(
  theme => ({
    root: {},
    filter: {
      flexGrow: '4'
    },
    upload: {
      margin: '10px 0'
    },
    activeLink: {
      color: theme.palette.primary.main
    }
  }),
  {
    name: 'components-custom-filter'
  }
);

export default useStyles;
