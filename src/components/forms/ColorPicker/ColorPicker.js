import React, {useEffect, useState} from 'react';
import {SketchPicker} from 'react-color';
import {useFormContext} from 'react-hook-form';
import {FormGroup, Input, Label} from 'reactstrap';
import './styles.scss';

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
            cursor: 'pointer',
            color: '#FFFFFF',
            textShadow:
              'black -2px 0px, black 0px 2px, black 2px 0px, black 0px -2px'
          }}
          placeholder="Click to select color"
          name={name}
          innerRef={register}
          readOnly
        />
        {displayColorPicker ? (
          <div style={popover}>
            <div style={cover} onClick={onClosePicker} />
            <SketchPicker
              className="c-sketch-picker"
              color={color}
              onChange={onChangeColor}
            />
          </div>
        ) : null}
      </div>
    </FormGroup>
  );
};

export default ColorPicker;
