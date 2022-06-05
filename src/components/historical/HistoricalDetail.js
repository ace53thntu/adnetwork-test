//---> Build-in Modules
import React from 'react';

//---> External Modules
import {Table} from 'reactstrap';
import {Chip} from '@material-ui/core';
import PropTypes from "prop-types"

//---> Internal Modules
import {LoadingIndicator} from 'components/common';
import {useGetLogDifference} from 'queries/historical';
import {useDestructureLogDifference, useParseLogValue} from './hook';
import { mappingStrategyFields } from './utils';

const propTypes = {
  sourceId: PropTypes.number,
  compareId: PropTypes.number,
}

const HistoricalDetail = ({sourceId, compareId}) => {
  const {data, isFetching} = useGetLogDifference({
    params: {
      id_source: sourceId,
      id_compare: compareId
    },
    enabled: !!sourceId && !!compareId
  });
  console.log(
    '🚀 ~ file: HistoricalDetail.js ~ line 13 ~ HistoricalDetail ~ data',
    data
  );
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
            field name{' '}
            <Chip
              label={`${totalDiff || '0'}`}
              size="small"
              style={{color: 'grey', fontSize: '12px'}}
            />
          </th>
          <th>old value</th>
          <th>new value</th>
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
    console.log(
      '🚀 ~ file: HistoricalDetail.js ~ line 47 ~ returnlogDetails?.map ~ logDiff',
      logDiff
    );
    const parsedLog = mappingStrategyFields({obj: logDiff, fieldName});
    return (
      <tr key={`pr-${index}`}>
        <td>
          <code>{fieldName}</code>
        </td>
        <td style={{color: 'red'}}>
          <LogCell logValue={parsedLog?.old} />
        </td>
        <td style={{color: 'blue'}}>
          <LogCell logValue={parsedLog?.new} />
        </td>
      </tr>
    );
  });
};

const LogCell = ({logValue}) => {
  const log = useParseLogValue({logObj: logValue});
  return log;
};

HistoricalDetail.propTypes = propTypes;

export default HistoricalDetail;
