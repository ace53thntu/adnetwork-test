//---> Build-in Modules
import {ChartTypes, REPORT_INPUT_NAME, TimeUnits} from 'constants/report';
import {useReport} from 'pages/entity-report/hooks';
import React from 'react';

//---> External Modules
import {useFormContext, useWatch} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {
  setChartTypeSelectedRedux,
  setIsCompareChartRedux,
  setMetricBodyRedux,
  useMetricsBodySelector,
  useMetricsetSelectedSelector
} from 'store/reducers/entity-report';

//---> Internal Modules
import DropdownChartType from './DropdownChartType';

const ConfigChart = ({chartTypeDefault, colorDefault, metricSet}) => {
  const dispatch = useDispatch();
  const {register, setValue} = useFormContext();
  const metricBody = useMetricsBodySelector();
  const metricsetSelected = useMetricsetSelectedSelector();

  const {colors, onChangeColor, typeSelected, onSelectType} = useReport({
    chartTypeDefault,
    colorDefault,
    metricSet
  });
  const reportByUuid = useWatch({
    name: `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.REPORT_BY_UUID}`
  });
  const reportSource = useWatch({
    name: `${REPORT_INPUT_NAME.REPORT_SOURCE}`
  });
  const reportBy = useWatch({
    name: `${REPORT_INPUT_NAME.API}.${REPORT_INPUT_NAME.REPORT_BY}`
  });

  const isChartCompare =
    !reportByUuid && reportSource?.value !== reportBy?.value;

  React.useEffect(() => {
    setValue(
      `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.CHART_TYPE}`,
      chartTypeDefault
    );
  }, [chartTypeDefault, setValue]);

  React.useEffect(() => {
    setValue(
      `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.COLOR}`,
      colorDefault
    );
  }, [chartTypeDefault, colorDefault, setValue]);

  React.useEffect(() => {
    dispatch(setIsCompareChartRedux(isChartCompare));
  }, [dispatch, isChartCompare]);

  React.useEffect(
    function initChartTypeWithGlobalTimeRange() {
      if (
        isChartCompare &&
        ![ChartTypes.BAR, ChartTypes.PIE].includes(typeSelected) &&
        metricBody.time_unit !== TimeUnits.GLOBAL &&
        metricsetSelected?.length < 2
      ) {
        setValue(
          `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.CHART_TYPE}`,
          ChartTypes.PIE
        );
        onSelectType(ChartTypes.PIE);
        dispatch(setChartTypeSelectedRedux(ChartTypes.PIE));
        dispatch(
          setMetricBodyRedux({
            ...metricBody,
            time_unit: TimeUnits.GLOBAL
          })
        );
      }
    },
    [
      chartTypeDefault,
      dispatch,
      isChartCompare,
      metricBody,
      metricsetSelected?.length,
      onSelectType,
      setValue,
      typeSelected
    ]
  );

  return (
    <div className="d-flex">
      {/* Custom dropdown select chart type */}
      <DropdownChartType
        metricSet={metricSet}
        onChangeColor={onChangeColor}
        onSelectType={onSelectType}
        colors={colors}
        chartType={typeSelected}
        isChartCompare={isChartCompare}
      />

      {/* Register hidden inputs to submit to API */}
      <input
        type="hidden"
        name={`${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.COLOR}`}
        value={JSON.stringify(colors) || ''}
        ref={register()}
      />
      <input
        type="hidden"
        name={`${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.CHART_TYPE}`}
        value={typeSelected || ''}
        ref={register()}
      />
    </div>
  );
};

export default ConfigChart;
