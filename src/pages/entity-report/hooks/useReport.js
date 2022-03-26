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
  const {setValue} = useFormContext();
  const [colors, setColors] = React.useState([]);
  const [typeSelected, setTypeSelected] = React.useState(['line']);

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
