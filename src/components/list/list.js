import Checkbox from '@material-ui/core/Checkbox';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MuiList from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import SettingsIcon from '@material-ui/icons/Settings';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import BodyText from './body-text';
import Header from './header';
import ListItem from './list-item';
import {useListStyles} from './styles';

function List(props) {
  const {
    data,
    columns,
    handleClickItem,
    showAction,
    actions,
    handleAction,
    checkedValues,
    checkable,
    selectable,
    selectedValue,
    disabled,
    noTruncate
  } = props;

  const classes = useListStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event, item) => {
    actions?.length && setAnchorEl(event.currentTarget);
    actions?.length && setCurrentItem(item);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setCurrentItem(null);
  };

  return (
    <div className={classes.root}>
      <MuiList>
        {data?.map((item, itemIndex) => {
          return (
            <ListItem
              key={item?.id ?? itemIndex}
              handleClick={() => (disabled ? {} : handleClickItem(item))}
              status={item?.status}
            >
              {checkable && !selectable ? (
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={
                      disabled ? false : checkedValues.indexOf(item.id) !== -1
                    }
                    tabIndex={-1}
                    disableRipple
                    disabled={disabled}
                    inputProps={{
                      'aria-labelledby': `checkbox-list-label-${item?.id}`
                    }}
                  />
                </ListItemIcon>
              ) : null}

              {selectable && !checkable ? (
                <ListItemIcon>
                  <Radio
                    checked={disabled ? false : selectedValue === item?.id}
                    value={item.id}
                    name={`radio-button-${item?.id}`}
                    disabled={disabled}
                    inputProps={{
                      'aria-label': `checkbox-list-label-${item?.id}`
                    }}
                  />
                </ListItemIcon>
              ) : null}

              <Grid container spacing={2}>
                {columns?.map((column, index) => {
                  const {header, accessor, cell} = column;
                  return (
                    <Grid
                      item
                      md
                      zeroMinWidth
                      xs={6}
                      sm={6}
                      key={index}
                      className={!header ? classes.noHeader : ''}
                    >
                      {header ? <Header text={header} /> : null}
                      {cell ? (
                        cell({
                          value: item?.[accessor] ?? '',
                          original: item,
                          index: itemIndex
                        })
                      ) : (
                        <BodyText
                          text={item?.[accessor] ?? ''}
                          noHeader={!header}
                          noTruncate={noTruncate}
                        />
                      )}
                    </Grid>
                  );
                })}
              </Grid>

              {showAction ? (
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-controls="setting-action-menu"
                    aria-haspopup="true"
                    onClick={event => handleOpenMenu(event, item)}
                  >
                    <SettingsIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              ) : null}
            </ListItem>
          );
        })}
      </MuiList>
      {showAction && actions?.length ? (
        <Menu
          id="setting-action-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          TransitionComponent={Fade}
          elevation={0}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          getContentAnchorEl={null}
          classes={{
            paper: classes.paperMenu
          }}
          keepMounted={false}
        >
          {actions.map((action, idx) => (
            <MenuItem
              key={idx}
              onClick={() => {
                handleAction(idx, currentItem);
                handleCloseMenu();
              }}
            >
              {action}
            </MenuItem>
          ))}
        </Menu>
      ) : null}
    </div>
  );
}

List.propTypes = {
  /**
   * The columns of each item
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Header name
       */
      header: PropTypes.string,
      /**
       * This is the `key` for get value
       * from item
       * ex: `accessor` = `name` then the
       * value is `item[name]`
       */
      accessor: PropTypes.string.isRequired,
      /**
       * Custom cell function
       * ex: show status value, progress value
       */
      cell: PropTypes.func
    })
  ).isRequired,
  /**
   * The data of items
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    })
  ).isRequired,
  /**
   * Function handle when click on an item
   */
  handleClickItem: PropTypes.func,
  /**
   * If `true` then will show action (with setting icon)
   * at the end of each item
   */
  showAction: PropTypes.bool,
  /**
   * Function handle when click on an action
   */
  handleAction: PropTypes.func,
  /**
   * Action list
   */
  actions: PropTypes.arrayOf(PropTypes.string),
  checkedValues: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  checkable: PropTypes.bool,
  selectable: PropTypes.bool,
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

List.defaultProps = {
  handleClickItem: () => {},
  handleAction: () => {},
  showAction: false,
  actions: [],
  checkedValues: [],
  checkable: false,
  selectable: false,
  selectedValue: '',
  disabled: false
};

export default List;
