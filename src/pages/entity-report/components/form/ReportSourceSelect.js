import {FormReactSelect} from 'components/forms';
import React from 'react';
import {useFormContext} from 'react-hook-form';

export default function ReportSourceSelect({
  defaultValue,
  reportSourceOptions = []
}) {
  const {setValue} = useFormContext();

  React.useEffect(() => {
    if (defaultValue) {
      setValue('report_source', defaultValue);
    }
  }, [defaultValue, setValue]);

  return (
    <FormReactSelect
      name={'report_source'}
      options={reportSourceOptions}
      label={<span className="font-weight-bold">Report source</span>}
      placeholder="Select report source..."
      disabled
    />
  );
}
