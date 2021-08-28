//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useFormContext} from 'react-hook-form';
import {Col, Row} from 'reactstrap';

//---> Internal Modules
import {FormReactSelect, FormTextInput} from 'components/forms';
import {getInventoryTags} from 'pages/Container/constants';
import ColorPicker from 'components/forms/ColorPicker';

const InventoryProperty = () => {
  const {formState} = useFormContext();
  const inventoryTags = getInventoryTags();

  return (
    <>
      <Row>
        <Col sm={4}>
          <FormTextInput
            isRequired={false}
            name="metadata.width"
            placeholder="0"
            label="Width"
            disable={formState.isSubmitting}
          />
        </Col>
        <Col sm={4}>
          <FormTextInput
            isRequired={false}
            name="metadata.height"
            placeholder="0"
            label="Height"
            disable={formState.isSubmitting}
          />
        </Col>
        <Col sm={4}>
          <ColorPicker
            name="metadata.background_color"
            label="Background color"
          />
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <FormTextInput
            isRequired={false}
            name="metadata.extension"
            placeholder="0"
            label="Extension"
            disable={formState.isSubmitting}
          />
        </Col>
        <Col sm={4}>
          <FormTextInput
            isRequired={false}
            name="metadata.duration"
            placeholder="0"
            label="Duration"
            disable={formState.isSubmitting}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <FormReactSelect
            required={false}
            name="metadata.tags"
            label="Tags"
            placeholder="Select tag"
            optionLabelField="name"
            options={inventoryTags}
            disabled={formState.isSubmitting}
            multiple={true}
          />
        </Col>
      </Row>
    </>
  );
};

export default InventoryProperty;
