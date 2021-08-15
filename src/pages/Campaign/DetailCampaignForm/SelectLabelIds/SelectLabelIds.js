//---> Build-in Modules
import React from 'react';

//---> Internal Modules
import {CAMPAIGN_KEYS} from '../../constants';
import {useDestructureLabels} from '../../hooks';
import {FormReactSelect} from 'components/forms';

const SelectLabelIds = ({labelsData = []}) => {
  const options = useDestructureLabels({labelsData});

  return (
    <FormReactSelect
      name={CAMPAIGN_KEYS.CONV_LABEL_IDS}
      label="Conv Label IDs"
      options={options || []}
      multiple={true}
      required
    />
  );
};

export default SelectLabelIds;
