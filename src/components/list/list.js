import PropTypes from 'prop-types';
import React from 'react';

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

import BodyText from './body-text';
import Header from './header';
import ListItem from './list-item';
import {GridStyled, useListStyles} from './styles';

function List(props) {
  const {
    data,
    columns,
    handleClickItem,
    actions,
    handleAction,
    checkedValues,
    checkable,
    selectable,
    selectedValue,
    disabled,
    noTruncate,
    isShowInventoryHighlight,
    onChangeCheckBox
  } = props;

  const classes = useListStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentItem, setCurrentItem] = React.useState(null);
  const [selectedId, setSelectedId] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleOpenMenu = (event, item) => {
    setAnchorEl(event.currentTarget);
    actions?.length && setCurrentItem(item);
    item?.actions?.length && setSelectedId(item.id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setCurrentItem(null);
    setSelectedId(null);
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
              isBid={!!item?.has_active_bid && isShowInventoryHighlight}
              isDeal={!!item?.has_active_deal && isShowInventoryHighlight}
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
                    disabled={disabled || item?.status === 'inactive'}
                    inputProps={{
                      'aria-labelledby': `checkbox-list-label-${item?.id}`
                    }}
                    onChange={evt => onChangeCheckBox(evt, itemIndex, item)}
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
                  const {
                    header,
                    accessor,
                    cell,
                    xs = 6,
                    sm = 6,
                    ...rest
                  } = column;

                  return (
                    <GridStyled
                      item
                      md
                      zeroMinWidth
                      xs={xs}
                      sm={sm}
                      key={index}
                      className={!header ? classes.noHeader : ''}
                      {...rest}
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
                    </GridStyled>
                  );
                })}
              </Grid>

              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-controls="setting-action-menu"
                  aria-haspopup="true"
                  onClick={event => handleOpenMenu(event, item)}
                >
                  <SettingsIcon />
                </IconButton>
                {item?.actions?.length ? (
                  <Menu
                    id="setting-action-menu"
                    anchorEl={anchorEl}
                    open={selectedId === item.id}
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
                    {item.actions.map((action, idx) => (
                      <MenuItem
                        key={idx}
                        onClick={() => {
                          handleAction(idx, item);
                          handleCloseMenu();
                        }}
                      >
                        {action}
                      </MenuItem>
                    ))}
                  </Menu>
                ) : null}
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </MuiList>
      {actions?.length ? (
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
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isShowInventoryHighlight: PropTypes.bool,
  onChangeCheckBox: PropTypes.func
};

List.defaultProps = {
  handleClickItem: () => {},
  handleAction: () => {},
  actions: [],
  checkedValues: [],
  checkable: false,
  selectable: false,
  selectedValue: '',
  disabled: false,
  isShowInventoryHighlight: false,
  onChangeCheckBox: () => null
};

export default List;
