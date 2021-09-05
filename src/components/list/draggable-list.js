import {Tooltip} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MuiList from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Radio from '@material-ui/core/Radio';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import BodyText from './body-text';
import Header from './header';
import ListItem from './list-item';
import {useListStyles} from './styles';

function DraggableList(props) {
  const {
    data,
    columns,
    handleClickItem,
    showAction,
    checkedValues,
    checkable,
    selectable,
    selectedValue,
    disabled,
    onReorder,
    handleDelete,
    noTruncate
  } = props;
  const classes = useListStyles();

  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(
      data?.map((item, index) => ({
        id: item.id,
        content: <Item item={item} index={index} />
      }))
    );
  }, [data]);

  const Item = ({item, index}) => {
    return (
      <div className={classes.dnd}>
        <ListItem
          key={item?.id ?? index}
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
                      index: index
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
              <Tooltip title="Delete">
                <IconButton
                  onClick={() => handleDelete(item.position)}
                  className={classes.deleteBtn}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          ) : null}
        </ListItem>
      </div>
    );
  };

  const DraggableItem = ({item, index}) => {
    return (
      <Draggable draggableId={item.id} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {item.content}
          </div>
        )}
      </Draggable>
    );
  };

  const DraggableItemList = ({draggableItems}) => {
    return draggableItems?.map((item, index) => (
      <DraggableItem item={item} index={index} />
    ));
  };

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    onReorder(result.source.index, result.destination.index);
  }

  return (
    <div className={classes.root}>
      <MuiList>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {items?.length > 0 && (
                  <DraggableItemList draggableItems={items} />
                )}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </MuiList>
    </div>
  );
}

DraggableList.propTypes = {
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

  checkedValues: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  checkable: PropTypes.bool,
  selectable: PropTypes.bool,
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

DraggableList.defaultProps = {
  handleClickItem: () => {},
  showAction: false,
  actions: [],
  checkedValues: [],
  checkable: false,
  selectable: false,
  selectedValue: '',
  disabled: false
};

export default DraggableList;
