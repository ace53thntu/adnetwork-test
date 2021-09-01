//---> Build-in Modules
import React, {useEffect, useMemo} from 'react';

//---> External Modules
import {useFormContext} from 'react-hook-form';
import {useParams} from 'react-router-dom';

//---> Internal Modules
import {FormReactSelect} from 'components/forms';
import {validArray} from 'utils/helpers/dataStructure.helpers';

const SelectCampaign = ({
  t,
  listCampaignOptions,
  viewOnly,
  currentStrategy,
  isEdit
}) => {
  const {setValue} = useFormContext();
  const {campId} = useParams();

  const currentCampaign = useMemo(() => {
    if (validArray({list: listCampaignOptions})) {
      const foundCamp = [...listCampaignOptions].find(
        item => item?.value === campId
      );
      if (foundCamp) {
        return foundCamp;
      }

      return null;
    }

    return null;
  }, [campId, listCampaignOptions]);

  useEffect(() => {
    if (!isEdit) {
      setValue('campaign_uuid', currentCampaign);
    } else {
      setValue('campaign_uuid', currentStrategy?.campaign_uuid);
    }
  }, [currentCampaign, currentStrategy?.campaign_uuid, isEdit, setValue]);

  return (
    <>
      <FormReactSelect
        required
        name="campaign_uuid"
        label={t('campaign')}
        placeholder={t('selectACampaign')}
        options={listCampaignOptions}
        disabled={viewOnly}
      />
    </>
  );
};

export default SelectCampaign;
