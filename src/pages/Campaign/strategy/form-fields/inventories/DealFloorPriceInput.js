import React from 'react';

import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-input-field';
import {convertApiToGui} from 'utils/handleCurrencyFields';

const propTypes = {
  defaultValue: PropTypes.number,
  onChangeInputGlobal: PropTypes.func,
  strategyType: PropTypes.string
};

const DealFloorPriceInput = ({
  defaultValue = '',
  onChangeInputGlobal = () => null,
  strategyType = ''
}) => {
  const [inputVal, setInputVal] = React.useState('');

  React.useEffect(() => {
    setInputVal(convertApiToGui({value: defaultValue}));
  }, [defaultValue]);

  function onChangeInput(value) {
    setInputVal(value);
    onChangeInputGlobal(value);
  }

  return (
    <CurrencyInput
      className="form-control"
      value={inputVal}
      onValueChange={onChangeInput}
      step={1}
      placeholder="0.00"
      decimalSeparator="."
      groupSeparator=","
      disableGroupSeparators={false}
      decimalsLimit={3}
      prefix="$"
      // disabled={strategyType === StrategyTypes.NORMAL}
    />
  );
};

DealFloorPriceInput.propTypes = propTypes;

export default DealFloorPriceInput;
