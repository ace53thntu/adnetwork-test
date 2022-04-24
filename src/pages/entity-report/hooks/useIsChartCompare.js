import {REPORT_INPUT_NAME} from 'constants/report';
import React from 'react';
import {useFormContext} from 'react-hook-form';

export const useIsChartCompare = ({reportByUuid, reportBy, reportSource}) => {
  return React.useMemo(
    () => isChartCompareFn({reportByUuid, reportBy, reportSource}),
    [reportBy, reportByUuid, reportSource]
  );
};

export const useIsChartCompareInForm = () => {
  const {watch} = useFormContext();
  const reportSource = watch(`${REPORT_INPUT_NAME.REPORT_SOURCE}`);
  const reportBySelected = watch(
    `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.REPORT_BY}`
  );
  const reportByUuidSelected = watch(
    `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.REPORT_BY_UUID}`
  );

  const isChartCompare = React.useMemo(
    () =>
      isChartCompareFn({
        reportByUuid: reportByUuidSelected?.value,
        reportBy: reportBySelected?.value,
        reportSource: reportSource?.value
      }),
    [reportBySelected?.value, reportByUuidSelected, reportSource]
  );

  return isChartCompare;
};

const isChartCompareFn = ({reportByUuid, reportBy, reportSource}) => {
  return !reportByUuid && reportBy !== 'source' && reportSource !== reportBy
    ? true
    : false;
};
