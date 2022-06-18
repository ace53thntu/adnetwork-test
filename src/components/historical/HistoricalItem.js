import React from 'react';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import {Avatar, Chip, Grid} from '@material-ui/core';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import {makeStyles} from '@material-ui/core/styles';
import {useGetLogDifference} from 'queries/historical';
import {getFieldChanged} from './utils';
import './style.scss';

const useStyles = makeStyles(theme => ({
  createdTime: {
    fontSize: theme.typography.pxToRem(13),
    fontWeight: theme.typography.fontWeightRegular,
    color: 'grey',
    marginRight: 20
  },
  action: {
    textTransform: 'capitalize',
    marginLeft: 'auto',
    marginRight: 10
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    marginLeft: 20
  },
  fieldChanged: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textTransform: 'capitalize'
  }
}));

const HistoricalItem = ({logItem, entityName, entityType}) => {
  const classes = useStyles();
  const {data} = useGetLogDifference({
    params: {
      id_source: logItem?.id_source,
      id_compare: logItem?.id_compare
    },
    enabled: !!logItem?.id_source && !!logItem?.id_compare
  });
  const listFieldChanged = getFieldChanged({
    dataLog: data?.data,
    fieldName: logItem?.field_name
  });

  return (
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Typography className={classes.createdTime}>
            {moment(logItem?.created_at).format('YYYY-MM-DD hh:mm:ss')}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <div
            className={classes.fieldChanged}
            title={listFieldChanged?.join(', ')}
          >
            {listFieldChanged?.join(', ')}
          </div>
        </Grid>
        <Grid item>
          <Chip
            size="small"
            label={logItem?.action}
            className={classes.action}
            avatar={
              <Avatar>
                <TouchAppIcon />
              </Avatar>
            }
          />
        </Grid>
      </Grid>
    </AccordionSummary>
  );
};

export default HistoricalItem;
