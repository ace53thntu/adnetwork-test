import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';
import {makeStyles} from '@material-ui/core/styles';
import {alpha as fade} from '@material-ui/core/styles';

const boxShadow = color =>
  `0px 1px 3px 0px ${fade(color, 0.2)}, 0px 1px 1px 0px ${fade(
    color,
    0.14
  )}, 0px 2px 1px -1px ${fade(color, 0.12)}`;

const border1 = color => `1px solid ${color}`;

export const useListStyles = makeStyles(
  theme => ({
    root: {
      width: '100%'
    },
    listItemRoot: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[1],
      borderRadius: theme.shape.borderRadius * 2,
      marginBottom: theme.spacing(2),
      '&:not(:last-child)': {
        marginBottom: theme.spacing(2)
      }
    },
    boxStatus: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0
    },
    bodyText: {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    },
    paperMenu: {
      border: border1('#d3d4d5')
    },
    // status styles
    success: {
      border: border1(green[300]),
      boxShadow: boxShadow(green[300])
    },
    error: {
      border: border1(red[300]),
      boxShadow: boxShadow(red[300])
    },
    info: {
      border: border1(blue[300]),
      boxShadow: boxShadow(blue[300])
    },
    warning: {
      border: border1(orange[300]),
      boxShadow: boxShadow(orange[300])
    },
    default: {
      border: border1(grey[300]),
      boxShadow: boxShadow(grey[300])
    },
    noHeader: {
      display: 'flex',
      alignItems: 'center'
    },
    dnd: {
      '& .MuiButtonBase-root': {
        cursor: 'move'
      }
    },
    deleteBtn: {
      cursor: 'pointer !important'
    }
  }),
  {
    name: 'components-list'
  }
);

export const useAccordionListStyles = makeStyles(
  theme => ({
    container: {
      width: '100%'
    },
    root: {
      marginBottom: theme.spacing(2),
      '&:before': {
        display: 'none'
      }
    },

    round: {
      borderRadius: theme.spacing(1),
      '&:first-child': {
        borderRadius: theme.spacing(1)
      },
      '&:last-child': {
        borderRadius: theme.spacing(1)
      }
    },
    summaryContent: {
      margin: `${theme.spacing(1)}px 0`,
      '&.Mui-expanded': {
        margin: `${theme.spacing(1)}px 0`
      }
    },
    content: {
      paddingRight: 40
    },
    settingBox: {
      top: '50%',
      right: 16,
      position: 'absolute',
      transform: 'translateY(-50%)'
    }
  }),
  {
    name: 'components-accordion-list'
  }
);
