//---> Build-in Modules
import {INPUT_NAME} from 'constants/report';
import {useReport} from 'pages/entity-dashboard/hooks';
import React from 'react';

//---> External Modules
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import DropdownChartType from './DropdownChartType';

const ConfigChart = ({chartTypeDefault, colorDefault, metricSet}) => {
  const {register, setValue} = useFormContext();
  const {colors, onChangeColor, typeSelected, onSelectType} = useReport({
    chartTypeDefault,
    colorDefault,
    metricSet
  });

  React.useEffect(() => {
    setValue(INPUT_NAME.CHART_TYPE, chartTypeDefault);
  }, [chartTypeDefault, setValue]);

  React.useEffect(() => {
    setValue(INPUT_NAME.COLOR, colorDefault);
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
      />

      {/* Register hidden inputs to submit to API */}
      <input
        type="hidden"
        name={INPUT_NAME.COLOR}
        value={JSON.stringify(colors) || ''}
        ref={register()}
      />
      <input
        type="hidden"
        name={INPUT_NAME.CHART_TYPE}
        value={typeSelected || ''}
        ref={register()}
      />
    </div>
  );
};

export default ConfigChart;
