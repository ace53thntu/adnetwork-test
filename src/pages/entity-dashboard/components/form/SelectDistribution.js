import {FormReactSelect} from 'components/forms';
import React from 'react';
import {useFormContext} from 'react-hook-form';

export default function SelectDistribution({
  defaultValue,
  distributionOptions
}) {
  const {setValue} = useFormContext();

  React.useEffect(() => {
    if (defaultValue) {
      setValue('api.distribution_by', defaultValue);
    }
  }, [defaultValue, setValue]);

  return (
    <FormReactSelect
      name={'api.distribution_by'}
      options={distributionOptions}
      label={<span className="font-weight-bold">Distribution by</span>}
      placeholder="Select distribution..."
      disabled
    />
  );
}
