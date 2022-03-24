//---> Build-in Modules
import React from 'react';
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {REPORT_INPUT_NAME} from 'constants/report';

export const useReport = ({
  chartTypeDefault = [],
  colorDefault = [],
  metricSet = []
}) => {
  console.log('🚀 ~ file: useReport.js ~ line 13 ~ colorDefault', colorDefault);
  const {setValue} = useFormContext();
  const [colors, setColors] = React.useState([]);
  const [typeSelected, setTypeSelected] = React.useState(['line']);
  console.log('🚀 ~ file: useReport.js ~ line 16 ~ typeSelected', typeSelected);

  const onChangeColor = (index, selectedColor) => {
    const listColors = [...colors].map((item, idx) => {
      if (idx === index) {
        return selectedColor?.hex;
      }

      return item;
    });
    setColors(listColors);
    setValue(
      `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.COLOR}`,
      JSON.stringify(listColors)
    );
  };

  const onSelectType = value => {
    console.log('🚀 ~ file: useReport.js ~ line 34 ~ value', value);
    setTypeSelected(value);
    setValue(
      `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.CHART_TYPE}`,
      value,
      {shouldDirty: true, shouldValidate: true}
    );
  };

  React.useEffect(() => {
    try {
      setColors(JSON.parse(colorDefault));
    } catch (err) {
      setColors(colorDefault);
    }
  }, [colorDefault]);

  React.useEffect(() => {
    setTypeSelected(chartTypeDefault);
  }, [chartTypeDefault]);

  return {colors, onChangeColor, typeSelected, onSelectType};
};
