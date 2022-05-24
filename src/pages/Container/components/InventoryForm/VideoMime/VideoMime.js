//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

//---> Internal Modules
import {FormReactSelect} from 'components/forms';
import {VideoMineOptions, VideoMineTypes} from 'constants/inventory';
import {InventoryFormats} from 'pages/Container/constants';

const VideoMime = () => {
  const {t} = useTranslation();
  const {formState, watch, setValue} = useFormContext();
  const inventoryFormat = watch('format');
  const currentMimes = watch('metadata.mimes');

  React.useEffect(() => {
    if (
      inventoryFormat?.value === InventoryFormats.VIDEO &&
      (!currentMimes || currentMimes?.length === 0)
    ) {
      setValue('metadata.mimes', [
        {value: VideoMineTypes.MPEG4, label: 'MPEG-4'}
      ]);
    }
  });

  return (
    <FormReactSelect
      name="metadata.mimes"
      label={t('FORM.SUPPORT_MIMES_TYPE')}
      placeholder={`Select ${t('FORM.SUPPORT_MIMES_TYPE')}`}
      options={VideoMineOptions}
      disabled={formState.isSubmitting}
      multiple
    />
  );
};

export default VideoMime;
