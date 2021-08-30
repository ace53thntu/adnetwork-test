import React, {useEffect, useState} from 'react';
import {SketchPicker} from 'react-color';
import {useFormContext} from 'react-hook-form';
import {FormGroup, Input, Label} from 'reactstrap';

const popover = {
  position: 'absolute',
  zIndex: '2'
};
const cover = {
  position: 'fixed',
  top: '0px',
  right: '0px',
  bottom: '0px',
  left: '0px'
};

function hexToRgbA(hex) {
  let color = null;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    color = hex.substring(1).split('');
    if (color.length === 3) {
      color = [color[0], color[0], color[1], color[1], color[2], color[2]];
    }
    color = '0x' + color.join('');
    return (
      'rgba(' +
      [(color >> 16) & 255, (color >> 8) & 255, color & 255].join(',') +
      ',1)'
    );
  }
  throw new Error('Bad Hex');
}

const ColorPicker = ({label, name, defaultValue = '#cccccc'}) => {
  const {register, setValue} = useFormContext();
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState('');

  useEffect(() => {
    setColor(defaultValue);
    setValue(name, defaultValue);
  }, [defaultValue, name, setValue]);

  const onShowPicker = () => {
    setDisplayColorPicker(prevState => !prevState);
  };

  const onClosePicker = () => {
    setDisplayColorPicker(false);
  };

  const onChangeColor = colorVal => {
    setColor(colorVal?.hex);
    setValue(name, colorVal?.hex);
  };

  return (
    <FormGroup>
      <Label>{label}</Label>
      <div>
        <Input
          onClick={onShowPicker}
          style={{
            backgroundColor: color ? color : '#FFFFFF',
            cursor: 'pointer'
          }}
          placeholder="Click to select color"
          name={name}
          innerRef={register}
        />
        {displayColorPicker ? (
          <div style={popover}>
            <div style={cover} onClick={onClosePicker} />
            <SketchPicker color={color} onChange={onChangeColor} />
          </div>
        ) : null}
      </div>
    </FormGroup>
  );
};

export default ColorPicker;
