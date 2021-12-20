import React from 'react';

import PropTypes from 'prop-types';
import {Input} from 'reactstrap';

const propTypes = {
  defaultValue: PropTypes.number
};

const DealFloorPriceInput = ({defaultValue = 0}) => {
  const [inputval, setInputVal] = React.useState(0);

  React.useEffect(() => {
    setInputVal(defaultValue);
  }, [defaultValue]);

  function onChangeInput(evt) {
    setInputVal(evt.target.value);
  }

  return <Input value={inputval} onChange={onChangeInput} />;
};

DealFloorPriceInput.propTypes = propTypes;

export default DealFloorPriceInput;
