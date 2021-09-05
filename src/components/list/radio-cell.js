import {Radio} from '@material-ui/core';

const RadioCell = ({selectedValue, value}) => {
  return <Radio checked={value === selectedValue} value={value} />;
};

export default RadioCell;
