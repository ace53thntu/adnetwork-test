import React from 'react';
import {useFormContext} from 'react-hook-form';
import ColorSlider from './ColorSlider';
import {REPORT_INPUT_NAME} from 'constants/report';
import {parseColors as parseColorsFn} from 'pages/entity-report/utils';

const ColorSliderContainer = () => {
  const {setValue, watch} = useFormContext();
  const colors = watch(
    `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.COLOR}`
  );
  console.log(
    '🚀 ~ file: ColorSliderContainer.js ~ line 12 ~ ColorSliderContainer ~ colors',
    colors
  );
  const parsedColor = parseColorsFn(colors);
  console.log(
    '🚀 ~ file: ColorSliderContainer.js ~ line 17 ~ ColorSliderContainer ~ parsedColor',
    parsedColor
  );

  function onChangeColor(index, color) {
    const listColors = parsedColor.map((item, idx) => {
      if (idx === index) {
        return color?.hex;
      }
      return item;
    });

    setValue(
      `${REPORT_INPUT_NAME.PROPERTIES}.${REPORT_INPUT_NAME.COLOR}`,
      JSON.stringify(listColors),
      {
        shouldDirty: true
      }
    );
  }

  return (
    <div className="color-wrap">
      {parsedColor?.map((colorItem, idx) => {
        return (
          <div key={`pr-${idx}`} className="c-color-item mb-2">
            <ColorSlider
              color={colorItem}
              onChangeColor={onChangeColor}
              index={idx}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ColorSliderContainer;
