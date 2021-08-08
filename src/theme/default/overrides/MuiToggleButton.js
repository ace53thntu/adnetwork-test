import * as colors from '@material-ui/core/colors';

import palette from '../palette';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  root: {
    color: palette.icon,
    '&:hover': {
      backgroundColor: colors.grey[100]
    },
    '&$selected': {
      backgroundColor: colors.grey[50],
      color: palette.primary.main,
      '&:hover': {
        backgroundColor: colors.grey[100]
      }
    },
    '&:first-child': {
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4
    },
    '&:last-child': {
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4
    }
  }
};
