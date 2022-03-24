//---> Build-in Modules
import {REPORT_INPUT_NAME} from 'constants/report';
import {useReport} from 'pages/entity-report/hooks';
import React from 'react';

//---> External Modules
import {useFormContext, useWatch} from 'react-hook-form';

//---> Internal Modules
import DropdownChartType from './DropdownChartType';

const ConfigChart = ({chartTypeDefault, colorDefault, metricSet}) => {
  const {register, setValue} = useFormContext();
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
