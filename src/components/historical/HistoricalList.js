import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import {Avatar, Chip} from '@material-ui/core';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import {Badge} from 'reactstrap';
import {useDestructureCappingLogList, useDestructureLogList} from './hook';
import HistoricalDetail from './HistoricalDetail';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {sortLogs} from './utils';

const getColorByEntityType = entityType => {
  switch (entityType) {
    case 'strategy':
      return 'success';
    case 'campaign':
      return 'danger';
    case 'creative':
      return 'primary';
    case 'inventory':
      return 'warning';
    default:
      break;
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 'calc(100vh - 250px)'
  },
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
  }
}));

export default function HistoricalList({
  logList = [],
  cappingLogs = [],
  entityName,
  entityType
}) {
  const classes = useStyles();
  const destructuredList = useDestructureLogList({logList});
  console.log(
    '🚀 ~ file: HistoricalList.js ~ line 38 ~ HistoricalList ~ destructuredList',
    destructuredList
  );
  console.log('🚀 ~ file: Historical.js ~ line 59 ~ cappingLogs', cappingLogs);
  const destructuredCappingLogs = useDestructureCappingLogList(cappingLogs);
  console.log(
    '🚀 ~ file: Historical.js ~ line 60 ~ destructuredCappingLogs',
    destructuredCappingLogs
  );
  const combinedLogs = sortLogs([
    ...destructuredList,
    ...destructuredCappingLogs
  ]);
  console.log(
    '🚀 ~ file: Historical.js ~ line 73 ~ combinedLogs',
    combinedLogs
  );

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <PerfectScrollbar>
        {combinedLogs?.map(logItem => {
          return (
            <Accordion
              key={`pr-${logItem?.id}`}
              expanded={expanded === logItem?.id}
              onChange={handleChange(logItem?.id)}
              TransitionProps={{unmountOnExit: true}}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.createdTime}>
                  {moment(logItem?.created_at).format('YYYY-MM-DD hh:mm:ss')}
                </Typography>
                <Badge color={getColorByEntityType(entityType)} size="sm">
                  {entityType}
                </Badge>
                <Typography className={classes.heading}>
                  {entityName}
                </Typography>
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
              </AccordionSummary>
              <AccordionDetails>
                <HistoricalDetail
                  sourceId={logItem?.id_source}
                  compareId={logItem?.id_compare}
                />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </PerfectScrollbar>
    </div>
  );
}
