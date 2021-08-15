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
        item => item?.value === parseInt(campId, 10)
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
      setValue('campaign_id', currentCampaign);
    } else {
      setValue('campaign_id', currentStrategy?.campaign_id);
    }
  }, [currentCampaign, currentStrategy?.campaign_id, isEdit, setValue]);

  return (
    <>
      <FormReactSelect
        required
        name="campaign_id"
        label={t('campaign')}
        placeholder={t('selectACampaign')}
        options={listCampaignOptions}
        disabled={viewOnly}
      />
    </>
  );
};

export default SelectCampaign;
