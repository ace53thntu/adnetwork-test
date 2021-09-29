/**
 * Copyright (c) 2021-present, AiCactus, Inc.
 * All rights reserved.
 *
 * @flow
 */

//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {FormReactSelect} from 'components/forms';
import {INPUTS_NAME} from 'pages/InventoryMarket/constants';

export default function DealSelect({options = []}) {
  const {register} = useFormContext();

  React.useEffect(() => {
    register(INPUTS_NAME.DEAL_UUID);
  }, [register]);

  return (
    <FormReactSelect
      name={INPUTS_NAME.DEAL_UUID}
      options={options}
      label="Deal"
      placeholder="Select deal..."
      required
    />
  );
}

DealSelect.propTypes = {
  options: PropTypes.array
};
