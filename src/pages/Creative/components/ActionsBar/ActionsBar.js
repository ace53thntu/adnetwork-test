import {useOnClickOutside} from 'hooks/useOnClickOutside';
// import PropTypes from 'prop-types';
import * as React from 'react';
import {useDispatch} from 'react-redux';
import {toggleCreateCreativeDialog} from 'store/reducers/creative';

import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
// import ListItemText from '@material-ui/core/ListItemText';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import {CloudUpload} from '@material-ui/icons';
import FilterList from '@material-ui/icons/FilterList';
import PhotoSizeSelectLargeIcon from '@material-ui/icons/PhotoSizeSelectLarge';
import ViewListIcon from '@material-ui/icons/ViewList';
import VisibilityIcon from '@material-ui/icons/Visibility';

import useStyles from './ActionsBar.styles';
import CustomFilter from './CustomFilter';

function ActionsBar(props) {
  const ref = React.useRef();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isShowFilter, setIsShowFilter] = React.useState(false);

  const [anchorViewAsEl, setAnchorViewAsEl] = React.useState(null);
  const [anchorGroupByEl, setAnchorGroupByEl] = React.useState(null);

  useOnClickOutside(ref, () => setIsShowFilter(false));

  const handleClickViewAsMenu = event => {
    setAnchorViewAsEl(event.currentTarget);
  };
  const handleCloseViewAsMenu = () => {
    setAnchorViewAsEl(null);
  };

  const handleClickGroupByMenu = event => {
    setAnchorGroupByEl(event.currentTarget);
  };
  const handleCloseGroupByMenu = () => {
    setAnchorGroupByEl(null);
  };

  const handleToggleCreateCreativeDialog = () => {
    dispatch(toggleCreateCreativeDialog());
  };

  return (
    <Grid container alignItems="center" justifyContent="flex-end" ref={ref}>
      <Collapse in={isShowFilter} className={classes.filter}>
        <Grid item>
          <CustomFilter />
        </Grid>
      </Collapse>

      <Grid item>
        <IconButton color="default" onClick={handleClickViewAsMenu}>
          <Tooltip title="View as">
            <VisibilityIcon />
          </Tooltip>
        </IconButton>
        <IconButton
          // color={activeGroup ? 'primary' : 'default'}
          color="default"
          onClick={handleClickGroupByMenu}
        >
          <Tooltip title="Group By">
            <ViewListIcon></ViewListIcon>
          </Tooltip>
        </IconButton>
        <IconButton
          // color={isSelecting ? 'primary' : 'default'}
          color="default"
          // onClick={() => toggleIsSelecting(!isSelecting)}
        >
          <Tooltip title="Select">
            <PhotoSizeSelectLargeIcon />
          </Tooltip>
        </IconButton>
        <IconButton
          color={'default'}
          onClick={handleToggleCreateCreativeDialog}
        >
          <Tooltip title="Upload">
            <CloudUpload />
          </Tooltip>
        </IconButton>
        <IconButton
          color={isShowFilter ? 'primary' : 'default'}
          onClick={() => setIsShowFilter(!isShowFilter)}
        >
          <Tooltip title="Filter">
            <FilterList />
          </Tooltip>
        </IconButton>
      </Grid>
    </Grid>
  );
}

ActionsBar.propTypes = {};
ActionsBar.defaultProps = {};

export default ActionsBar;
