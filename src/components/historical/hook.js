import React from 'react';
import _ from 'lodash';

export const useDestructureLogList = ({logList = []}) => {
  console.log(
    '🚀 ~ file: hook.js ~ line 4 ~ useDestructureLogList ~ logList',
    logList
  );
  return React.useMemo(() => {
    return logList?.map((logItem, index) => {
      const idCompare = logList?.[index + 1]?.id || null;
      return {
        ...logItem,
        id_source: logItem?.id,
        id_compare: idCompare
      };
    });
  }, [logList]);
};

export const useDestructureLogDifference = ({diffData}) => {
  return React.useMemo(() => {
    if (
      !diffData ||
      typeof diffData !== 'object' ||
      !Object.keys(diffData).keys
    ) {
      return [];
    }

    const objToArr = [...Object.entries(diffData)];

    return objToArr;
  }, [diffData]);
};

export const useParseLogValue = ({logObj}) => {
  return React.useMemo(() => {
    if (!logObj) {
      return null;
    }
    return aggregateLogValue(logObj);
  }, [logObj]);
};

const aggregateLogValue = logValue => {
  console.log('🚀 ~ file: hook.js ~ line 52 ~ logValue', logValue);
  if (typeof logValue === 'string' || typeof logValue === 'number') {
    return logValue;
  }

  if (_.isArray(logValue)) {
    console.log('🚀 ~ file: hook.js ~ line 57 ~ logValue', logValue);
    return logValue?.reduce((acc, item, index) => {
      acc = `${acc} ${item?.name},`;
      if (index === logValue.length - 1) {
        console.log('=== 111', index === logValue.length - 1);
        acc = acc?.slice(0, -1);
      }
      return acc;
    }, '');
  }

  return '';
};
