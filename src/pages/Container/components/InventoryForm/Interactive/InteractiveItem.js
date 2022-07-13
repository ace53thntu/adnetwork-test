import {Collapse} from 'components/common';
import {FormReactSelect} from 'components/forms';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';
import FormCodeMirror from 'components/forms/FormCodeMirror';
import React from 'react';
import {Button, Col, Row} from 'reactstrap';
import {
  getInteractiveFileTypeOptions,
  getInteractivePlayTypeOptions
} from '../constant';

const InteractiveItem = ({index, fieldItem, onClickRemove = () => null}) => {
  return (
    <Collapse title={fieldItem?.play_type?.label} initialOpen unMount={false}>
      <Row>
        <Col sm="4">
          <FormReactSelect
            options={getInteractiveFileTypeOptions()}
            label="File type"
            placeholder="File type"
            name={`custom_play_type_data[${index}].file_type`}
            defaultValue={fieldItem?.file_type}
            disabled
          />
        </Col>
        <Col sm="4">
          <FormReactSelect
            label="Play type"
            placeholder="Play type"
            name={`custom_play_type_data[${index}].play_type`}
            options={getInteractivePlayTypeOptions()}
            defaultValue={fieldItem?.play_type}
            disabled
          />
        </Col>
        <Col sm="4">
          <CurrencyInputField
            label="Price"
            placeholder="price"
            name={`custom_play_type_data[${index}].price`}
            defaultValue={fieldItem?.price}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
          />
        </Col>
        <Col sm="12">
          <FormCodeMirror
            name={`custom_play_type_data[${index}].meta`}
            label="Meta"
            extension="JSON"
            showError={false}
            defaultValue={fieldItem?.meta}
          />
        </Col>
        <Col sm="12" className="d-flex justify-content-end mt-2">
          <Button
            color="danger"
            type="button"
            onClick={() => onClickRemove(index)}
          >
            Remove
          </Button>
        </Col>
      </Row>
    </Collapse>
  );
};

export default InteractiveItem;
