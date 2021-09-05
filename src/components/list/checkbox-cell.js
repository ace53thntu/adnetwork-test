import {Checkbox} from '@material-ui/core';

const CheckboxCell = ({target, checked, onChange}) => {
  return (
    <Checkbox
      checked={checked}
      onChange={event => onChange(target, event.target.checked)}
    />
  );
};

export default CheckboxCell;
