import {FormReactSelect} from 'components/forms';
import React from 'react';

const InteractivePlayTypeSelect = ({playTypeOptions = []}) => {
  return (
    <FormReactSelect
      label="Play type"
      placeholder="Play type"
      name="interactive_add.play_type"
      options={playTypeOptions}
      required
    />
  );
};

export default InteractivePlayTypeSelect;
