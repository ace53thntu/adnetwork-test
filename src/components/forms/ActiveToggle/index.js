import React from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

const STATUS = ['active', 'inactive'];
const [ACTIVE, INACTIVE] = STATUS;

const ActiveToggle = props => {
  const {value, onChange, disabled, ...rest} = props;
  const checked = value && value === ACTIVE;

  return (
    <React.Fragment>
      <label className="d-flex align-items-center" {...rest}>
        <Toggle
          checked={!!checked}
          disabled={disabled}
          onChange={() => onChange(checked ? INACTIVE : ACTIVE)}
        />
        <span className="ml-2">{checked ? 'Active' : 'Inactive'}</span>
      </label>
    </React.Fragment>
  );
};
export default React.memo(ActiveToggle);
