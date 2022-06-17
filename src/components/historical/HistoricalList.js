import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import {useDestructureCappingLogList, useDestructureLogList} from './hook';
import HistoricalDetail from './HistoricalDetail';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {sortLogs} from './utils';
import HistoricalItem from './HistoricalItem';
import {ButtonLoading} from 'components/common';

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
  const destructuredCappingLogs = useDestructureCappingLogList(cappingLogs);
  const combinedLogs = sortLogs([
    ...destructuredList,
    ...destructuredCappingLogs
  ]);

  const [numberOfPage, setNumberOfPage] = React.useState(10);
  const [expanded, setExpanded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (numberOfPage < combinedLogs?.length) {
        setNumberOfPage(prevState => prevState + 10);
        setIsLoading(false);
      }
    }, 300);
  };

  return (
    <div className={classes.root}>
      <PerfectScrollbar>
        {combinedLogs
          ?.filter((item, index) => index < numberOfPage)
          ?.map(logItem => {
            return (
              <Accordion
                key={`pr-${logItem?.id}`}
                expanded={expanded === logItem?.id}
                onChange={handleChange(logItem?.id)}
                TransitionProps={{unmountOnExit: true}}
              >
                <HistoricalItem
                  logItem={logItem}
                  entityName={entityName}
                  entityType={entityType}
                />
                <AccordionDetails>
                  <HistoricalDetail
                    sourceId={logItem?.id_source}
                    compareId={logItem?.id_compare}
                  />
                </AccordionDetails>
              </Accordion>
            );
          })}
        {numberOfPage < combinedLogs?.length && (
          <div className="d-flex justify-content-center mt-3">
            <ButtonLoading
              loading={isLoading}
              className="btn-primary"
              type="button"
              onClick={handleLoadMore}
            >
              Load more
            </ButtonLoading>
          </div>
        )}
      </PerfectScrollbar>
    </div>
  );
}
