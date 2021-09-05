import {createTheme as createMuiTheme} from '@material-ui/core/styles';

import palette from './palette';
import typography from './typography';
import overrides from './overrides';

const theme = createMuiTheme({
  palette,
  typography,
  overrides,
  props: {
    MuiButton: {}
  }
});

export default theme;
