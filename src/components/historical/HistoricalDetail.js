//---> Build-in Modules
import React from 'react';

//---> External Modules
import {Table} from 'reactstrap';
import {Chip} from '@material-ui/core';
import PropTypes from 'prop-types';
import moment from 'moment';

//---> Internal Modules
import {LoadingIndicator} from 'components/common';
import {useGetLogDifference} from 'queries/historical';
import {useDestructureLogDifference, useParseLogValue} from './hook';
import {
  getStrategyVideoFilterLogs,
  getStrategyContextFilterLogs,
  mappingStrategyFields
} from './utils';

const logFnByFieldName = {
  video_filter: getStrategyVideoFilterLogs,
  context_filter: getStrategyContextFilterLogs
};

const propTypes = {
  sourceId: PropTypes.number,
  compareId: PropTypes.number
};

const HistoricalDetail = ({sourceId, compareId}) => {
  const {data, isFetching} = useGetLogDifference({
    params: {
      id_source: sourceId,
      id_compare: compareId
    },
    enabled: !!sourceId && !!compareId
  });
  const diffData = useDestructureLogDifference({diffData: data?.data});
  const totalDiff = React.useMemo(() => data?.diff, [data?.diff]);

  if (isFetching) {
    return (
      <div style={{minHeight: 250}}>
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <Table>
      <thead>
        <tr>
          <th width="22%">
            Field Name{' '}
            <Chip
              label={`${totalDiff || '0'}`}
              size="small"
              style={{color: 'grey', fontSize: '12px'}}
            />
          </th>
          <th>Old Value</th>
          <th>New Value</th>
        </tr>
      </thead>
      <tbody>
        {diffData ? (
          <DetailItems logDetails={diffData} />
        ) : (
          <tr>
            <td rowSpan={3}>No detail</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

const DetailItems = ({logDetails}) => {
  return logDetails?.map(([fieldName, logDiff], index) => {
    if (['video_filter', 'context_filter'].includes(fieldName)) {
      const videoFilterLogs = logFnByFieldName[fieldName](logDiff);
      return videoFilterLogs?.map((item, videoFilterIndex) => {
        return (
          <LogRow
            key={`pr-${videoFilterIndex}`}
            name={item?.name}
            oldValue={item?.old}
            newValue={item?.new}
          />
        );
      });
    }

    if (fieldName === 'start_time' || fieldName === 'end_time') {
      if (moment(logDiff?.old).isSame(logDiff?.new)) {
        return null;
      }

      const formattedDateOld = moment(logDiff?.old).format('DD/MM/YYYY') || '';
      const formattedDateNew = moment(logDiff?.new).format('DD/MM/YYYY') || '';

      return (
        <LogRow
          key={`pr-${index}`}
          name={fieldName}
          oldValue={formattedDateOld}
          newValue={formattedDateNew}
        />
      );
    }

    const parsedLog = mappingStrategyFields({obj: logDiff, fieldName});
    return (
      <LogRow
        key={`pr-${index}`}
        name={fieldName}
        oldValue={parsedLog?.old}
        newValue={parsedLog?.new}
      />
    );
  });
};

const LogRow = ({name, oldValue, newValue}) => {
  return (
    <tr>
      <td>
        <code>{name}</code>
      </td>
      <td style={{color: 'red'}}>
        <LogCell logValue={oldValue} />
      </td>
      <td style={{color: 'blue'}}>
        <LogCell logValue={newValue} />
      </td>
    </tr>
  );
};

const LogCell = ({logValue}) => {
  const log = useParseLogValue({logObj: logValue});
  return log;
};

HistoricalDetail.propTypes = propTypes;

export default HistoricalDetail;
