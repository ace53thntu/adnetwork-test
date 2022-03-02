import React from 'react';

import PropTypes from 'prop-types';
import {Input} from 'reactstrap';

const propTypes = {
  defaultValue: PropTypes.number,
  onChangeInputGlobal: PropTypes.func
};

const DealFloorPriceInput = ({
  defaultValue = 0,
  onChangeInputGlobal = () => null
}) => {
  const [inputVal, setInputVal] = React.useState('');

  React.useEffect(() => {
    setInputVal(defaultValue);
  }, [defaultValue]);

  function onChangeInput(evt) {
    const {value} = evt.target;
    setInputVal(value);
    onChangeInputGlobal(value);
  }

  return <Input value={inputVal} onChange={onChangeInput} />;
};

DealFloorPriceInput.propTypes = propTypes;

export default DealFloorPriceInput;
