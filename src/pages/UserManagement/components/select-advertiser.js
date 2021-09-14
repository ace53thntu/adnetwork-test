import {FormReactSelect} from 'components/forms';
import React from 'react';
import {useFormContext} from 'react-hook-form';

const SelectAdvertiser = () => {
  const {watch} = useFormContext();
  const roleSelected = watch('role');

  return roleSelected?.value === 'advertiser' ? (
    <FormReactSelect
      name="advertiser_uuid"
      options={[]}
      label="Advertiser"
      placeholder="Select advertiser"
    />
  ) : null;
};

export default SelectAdvertiser;
