import React from 'react';
import {FormGroup, Label, CustomInput, Input as StrapInput} from 'reactstrap';
import {useFormContext} from 'react-hook-form';
import {ELEMENT_OPTIONS} from './constants';

export default function TrackElementInput() {
  const {register} = useFormContext();

  return (
    <FormGroup>
      <Label>
        <span className="text-danger">*</span> Element
      </Label>
      <div className="d-flex">
        <CustomInput
          type="select"
          id="trackElement"
          name="trackElement"
          className="mr-2"
          style={{width: 200}}
          innerRef={register}
        >
          {ELEMENT_OPTIONS.map(item => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </CustomInput>
        <StrapInput
          innerRef={register}
          name="element"
          placeholder="Element..."
          defaultValue=""
        />
      </div>
    </FormGroup>
  );
}
