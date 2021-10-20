import './styles.scss';

import __get from 'lodash/get';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import {FormFeedback, FormGroup, Label} from 'reactstrap';

export const FormTagsInput = ({
  label,
  required = false,
  name,
  disabled = false,
  defaultValue = [],
  placeholder
}) => {
  const {register, errors, setValue, watch} = useFormContext();
  const tagInput = React.createRef();
  const formValue = watch(name, defaultValue);
  const errorObj = __get(errors, name);
  const isError = errorObj?.message || errorObj?.length;

  React.useEffect(() => {
    register({name});
  }, [name, register]);

  const removeTag = i => {
    const newTags = [...formValue];
    newTags.splice(i, 1);
    setValue(name, newTags, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  const handleInputKeyDown = e => {
    const val = e.target.value;
    if ((e.key === ',' || e.key === ';' || e.key === 'Enter') && val) {
      e.preventDefault();
      if (formValue.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setValue(name, [...formValue, val], {
        shouldValidate: true,
        shouldDirty: true
      });
      tagInput.current.value = null;
      tagInput.current.focus();
    } else if (e.key === 'Backspace' && !val) {
      removeTag(formValue.length - 1);
    }
  };

  const _renderErrorMessage = () => {
    return errorObj?.message ? (
      <FormFeedback className="d-block">{errors?.[name]?.message}</FormFeedback>
    ) : errorObj?.length ? (
      <FormFeedback className="d-block">
        {errorObj?.find(err => err?.message)?.message}
      </FormFeedback>
    ) : null;
  };

  return (
    <FormGroup>
      {label && (
        <Label for="">
          {label}
          {required && <span className="text-danger"> *</span>}
        </Label>
      )}
      <div className={`input-tag ${isError && 'isInvalid'}`}>
        <div className="input-tag__tags">
          {formValue.map((tag, i) => (
            <div key={tag}>
              <span className={errorObj?.[i]?.message ? 'tag-invalid' : ''}>
                {tag}
              </span>
              <div
                onClick={() => {
                  removeTag(i);
                }}
              >
                <svg
                  height="14"
                  width="14"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                </svg>
              </div>
            </div>
          ))}
          <div className="input-tag__tags__input">
            <input
              type="text"
              onKeyDown={handleInputKeyDown}
              ref={tagInput}
              placeholder={placeholder}
            />
          </div>
        </div>
      </div>
      {_renderErrorMessage()}
    </FormGroup>
  );
};
