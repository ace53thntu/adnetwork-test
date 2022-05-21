import __get from 'lodash/get';
//---> External Modules
import PropTypes from 'prop-types';
//---> Build-in Modules
import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import {html} from '@codemirror/lang-html';
import {javascript} from '@codemirror/lang-javascript';
import {json} from '@codemirror/lang-json';
import {oneDark} from '@codemirror/theme-one-dark';
import CodeMirror from '@uiw/react-codemirror';

import ErrorMessage from '../ErrorMessage';

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  extension: PropTypes.string
};

const HEIGHT = '150px';
export const CodeMirrorExtensions = {
  JAVASCRIPT: javascript(),
  HTML: html(),
  JSON: json()
};

const FormCodeMirror = ({
  name = '',
  label = '',
  required = false,
  placeholder = `{"key": "value"}`,
  extension = 'JAVASCRIPT',
  defaultValue = ''
}) => {
  const {t} = useTranslation();
  const {control, errors} = useFormContext();
  const errorMessage = __get(errors, `${name}.message`);

  return (
    <div>
      <label>
        {required && <span className="required">*</span>}
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({onChange, onBlur, value, name: rhfName, ref}) => {
          return (
            <CodeMirror
              name={rhfName}
              value={value}
              height={HEIGHT}
              extensions={[CodeMirrorExtensions[extension]]}
              onChange={(value, viewUpdate) => {
                onChange(value);
              }}
              placeholder={placeholder}
              theme={oneDark}
              defaultValue={defaultValue}
            />
          );
        }}
      />
      {errors?.[name] && (
        <ErrorMessage message={errorMessage || t('required')} />
      )}
    </div>
  );
};

FormCodeMirror.propTypes = propTypes;

export default React.memo(FormCodeMirror);
