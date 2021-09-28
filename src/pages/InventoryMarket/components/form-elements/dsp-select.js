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

export default function DspSelect({options = []}) {
  const {register} = useFormContext();

  React.useEffect(() => {
    register(INPUTS_NAME.DSP_UUID);
  }, [register]);

  return (
    <FormReactSelect
      name={INPUTS_NAME.DSP_UUID}
      options={options}
      label="Dsp"
      placeholder="Select dsp..."
    />
  );
}

DspSelect.propTypes = {
  options: PropTypes.array
};
