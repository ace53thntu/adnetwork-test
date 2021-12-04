import {FormReactSelect} from 'components/forms';
import React from 'react';
import {useFormContext} from 'react-hook-form';

export default function SelectMetricType({defaultValue, metricTypeOptions}) {
  const {setValue} = useFormContext();

  React.useEffect(() => {
    if (defaultValue) {
      setValue('api.metric_type', defaultValue);
    }
  }, [defaultValue, setValue]);

  return (
    <FormReactSelect
      name={'api.metric_type'}
      options={metricTypeOptions}
      label={<span className="font-weight-bold">Metric type</span>}
      placeholder="Select distribution..."
      disabled
    />
  );
}
