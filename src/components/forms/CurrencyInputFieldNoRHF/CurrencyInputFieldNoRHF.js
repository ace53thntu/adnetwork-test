// Build-in Modules
import React from 'react';

// External Modules
import CurrencyInput from 'react-currency-input-field';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {Label} from 'reactstrap';

// Internal Modules
import {RequiredLabelPrefix} from 'components/common/RequireLabelPrefix';
import './_main.scss';

const propTypes = {
  className: PropTypes.string,
  inputId: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  prefix: PropTypes.string,
  groupSeparator: PropTypes.string,
  decimalSeparator: PropTypes.string,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool
};

const CurrencyInputFieldNoRHF = props => {
  const {t} = useTranslation();

  const {
    className = '',
    inputId = 'currencyInput',
    name: inputName = '',
    label = '',
    placeholder = t('pleaseEnterNumber'),
    required = false,
    prefix = '',
    groupSeparator = ',',
    decimalSeparator = '.',
    disabled = false,
    disableGroupSeparators = false,
    decimalsLimit = 2,
    invalid = false,
    value = '',
    onChange = () => null,
    ...rest
  } = props;

  return (
    <div className="form-group">
      {label && (
        <Label htmlFor={`${inputId}-${inputName}`}>
          {required && <RequiredLabelPrefix />}
          {label}
        </Label>
      )}
      <div>
        <CurrencyInput
          id={`${inputId}-${inputName}`}
          name={inputName}
          className={`form-control ${className} ${invalid ? 'c-invalid' : ''}`}
          value={value}
          onValueChange={onChange}
          placeholder={placeholder}
          prefix={prefix}
          step={1}
          groupSeparator={groupSeparator}
          disableGroupSeparators={disableGroupSeparators}
          decimalSeparator={decimalSeparator}
          decimalsLimit={decimalsLimit}
          disabled={disabled}
          {...rest}
        />
      </div>
    </div>
  );
};

CurrencyInputFieldNoRHF.propTypes = propTypes;

export default CurrencyInputFieldNoRHF;
