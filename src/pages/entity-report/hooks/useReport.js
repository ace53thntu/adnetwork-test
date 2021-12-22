import {INPUT_NAME} from 'constants/report';
import React from 'react';
import {useFormContext} from 'react-hook-form';

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
    setValue(INPUT_NAME.COLOR, JSON.stringify(listColors));
  };

  const onSelectType = value => {
    setTypeSelected(value);
    setValue(INPUT_NAME.CHART_TYPE, value);
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
