import {FormReactSelect} from 'components/forms';
import React from 'react';
import {useFormContext} from 'react-hook-form';

const SelectPublisher = ({options = []}) => {
  const {watch} = useFormContext();
  const roleSelected = watch('role');

  return roleSelected?.value === 'publisher' ? (
    <FormReactSelect
      name="publisher_uuid"
      options={options}
      label="Publisher"
      placeholder="Select publisher"
    />
  ) : null;
};

export default SelectPublisher;
