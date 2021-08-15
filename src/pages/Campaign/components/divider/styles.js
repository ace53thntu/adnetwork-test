import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  text: {
    color: '#F60',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  devider: {
    borderBottom: '4px solid #DADADA',
    height: '4px',
    margin: '0.25em 0px 20px',
    '& span': {
      display: 'block',
      width: '6rem',
      height: '4px',
      backgroundColor: '#F60'
    }
  }
}));

export default useStyles;
