import React from 'react';
import {HuePicker} from 'react-color';

export default function ColorSlider({
  color = '#6a994e',
  onChangeColor = () => null,
  index
}) {
  return (
    <div className="w-100">
      <HuePicker
        width="100%"
        height="12px"
        onChange={value => onChangeColor(index, value)}
        color={color}
      />
    </div>
  );
}
