import {FormReactSelect} from 'components/forms';
import React from 'react';
import {useFormContext} from 'react-hook-form';

const SelectDsp = ({options = []}) => {
  const {watch} = useFormContext();
  const roleSelected = watch('role');

  return roleSelected?.value === 'dsp' ? (
    <FormReactSelect
      name="dsp_uuid"
      options={options}
      label="Dsp"
      placeholder="Select dsp"
    />
  ) : null;
};

export default SelectDsp;
