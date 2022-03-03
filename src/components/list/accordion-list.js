import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, {useState} from 'react';

import BodyText from './body-text';
import Header from './header';
import {useAccordionListStyles, useListStyles} from './styles';

function AccordionList(props) {
  const {
    data,
    columns,
    showAction,
    actions,
    handleAction,
    detailPanel,
    detailCaption
  } = props;

  const classes = useAccordionListStyles();
  const classesList = useListStyles();

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

  const getStatusColor = status => {
    switch (status) {
      case 'active':
        return classesList.success;
      case 'error':
      case 'inactive':
        return classesList.error;
      case 'pending':
        return classesList.warning;
      case 'completed':
        return classesList.info;
      default:
        return classesList.default;
    }
  };

  return (
    <div className={classes.container}>
      {data.map((item, itemIndex) => {
        return (
          <Accordion
            key={itemIndex}
            classes={{
              rounded: classes.round,
              root: clsx(
                classes.root,
                item?.status ? getStatusColor(item.status) : ''
              )
            }}
            TransitionProps={{
              mountOnEnter: true,
              unmountOnExit: true
            }}
          >
            <AccordionSummary
              aria-controls={`panel${itemIndex}a-content`}
              id={`panel${itemIndex}a-header`}
              classes={{
                content: classes.summaryContent
              }}
            >
              <Grid container spacing={2} className={classes.content}>
                {columns.map((column, index) => {
                  const {
                    header,
                    accessor,
                    cell,
                    md = 6,
                    xs = 6,
                    sm = 6
                  } = column;

                  return (
                    <Grid
                      item
                      md={md}
                      zeroMinWidth
                      xs={xs}
                      sm={sm}
                      key={index}
                      className={!header ? classesList.noHeader : ''}
                    >
                      {header ? <Header text={header} /> : null}
                      {cell ? (
                        cell({value: item?.[accessor] ?? '', original: item})
                      ) : (
                        <BodyText
                          text={item?.[accessor] ?? ''}
                          noHeader={!header}
                        />
                      )}
                    </Grid>
                  );
                })}
              </Grid>
              <div className={classes.settingBox}>
                {showAction ? (
                  <IconButton
                    edge="end"
                    aria-controls="setting-action-menu"
                    aria-haspopup="true"
                    onClick={event => {
                      event.stopPropagation();
                      handleOpenMenu(event, item);
                    }}
                  >
                    <SettingsIcon />
                  </IconButton>
                ) : null}
              </div>
            </AccordionSummary>
            {detailPanel ? (
              <AccordionDetails style={{width: '100%'}}>
                <Grid direction="column" container>
                  {detailCaption ? (
                    <Typography
                      variant="subtitle1"
                      className={classesList.detailPanelTitle}
                    >
                      {detailCaption}
                    </Typography>
                  ) : null}

                  {detailPanel(item)}
                </Grid>
              </AccordionDetails>
            ) : null}
          </Accordion>
        );
      })}

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
            paper: classesList.paperMenu
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

AccordionList.propTypes = {
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
  detailPanel: PropTypes.func,
  detailCaption: PropTypes.string
};

AccordionList.defaultProps = {
  handleAction: () => {},
  showAction: false,
  actions: [],
  detailPanel: undefined,
  detailCaption: null
};

export default AccordionList;
