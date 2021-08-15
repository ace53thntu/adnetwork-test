import 'react-toggle/style.css';

import React from 'react';
import Toggle from 'react-toggle';

const STATUS = ['active', 'inactive'];
const [ACTIVE, INACTIVE] = STATUS;

const StatusToggle = props => {
  const {value, onChange, disabled = false, ...rest} = props;
  const checked = value && value === ACTIVE;

  return (
    <React.Fragment>
      <label className="d-flex align-items-center w-150" {...rest}>
        <Toggle
          checked={!!checked}
          onChange={() => onChange(checked ? INACTIVE : ACTIVE)}
          disabled={disabled}
        />
        <span className="ml-2">{checked ? 'Active' : 'Inactive'}</span>
      </label>
    </React.Fragment>
  );
};
export default React.memo(StatusToggle);
