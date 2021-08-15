import React from 'react';
import ReactToggle from 'react-toggle';
import 'react-toggle/style.css';
import styled, {css} from 'styled-components';

const Label = styled.span`
  text-transform: none;
  font-weight: 400;
  ${props =>
    !props.inline &&
    css`
      display: block;
      margin-bottom: 8px;
    `}
`;

const Toggle = ({
  onChange,
  checked = false,
  label,
  disabled = false,
  inline = true,
  ...rest
}) => {
  return (
    <label {...rest}>
      {label ? (
        <Label className="mr-2 align-middle" inline={inline}>
          {label}
        </Label>
      ) : null}
      <ReactToggle
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="align-middle"
      />
    </label>
  );
};

export default React.memo(Toggle);
