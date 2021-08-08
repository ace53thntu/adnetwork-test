import * as colors from '@material-ui/core/colors';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  root: {
    backgroundColor: colors.blueGrey[50],
    color: colors.blueGrey[900]
  },
  deletable: {
    '&:focus': {
      backgroundColor: colors.blueGrey[100]
    }
  }
};
