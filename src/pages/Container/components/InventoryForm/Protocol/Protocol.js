//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {FormReactSelect} from 'components/forms';
import {ProtocolOptions} from 'constants/misc';
import {InventoryFormats} from 'pages/Container/constants';

const Protocol = () => {
  const {t} = useTranslation();
  const {formState, watch, setValue} = useFormContext();
  const inventoryFormat = watch('format');
  const currentProtocols = watch('metadata.protocols');

  React.useEffect(() => {
    if (
      inventoryFormat?.value === InventoryFormats.VIDEO &&
      (!currentProtocols || currentProtocols?.length === 0)
    ) {
      setValue('metadata.protocols', [
        {value: 2, label: 'VAST 2.0'},
        {value: 3, label: 'VAST 3.0'},
        {value: 7, label: 'VAST 4.0'}
      ]);
    }
  });

  return (
    <FormReactSelect
      name="metadata.protocols"
      label={t('protocols')}
      placeholder={t('selectProtocol')}
      options={ProtocolOptions}
      disabled={formState.isSubmitting}
      multiple
    />
  );
};

export default Protocol;
