import {Collapse} from 'components/common';
import {FormReactSelect} from 'components/forms';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';
import FormCodeMirror from 'components/forms/FormCodeMirror';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import {Col, Row} from 'reactstrap';
import {
  getInteractiveFileTypeOptions,
  getInteractivePlayTypeOptions,
  getInteractiveStandardPlayTypeOptions,
  InteractiveFileType
} from '../constant';
import InteractivePlayTypeSelect from './InteractivePlayTypeSelect';

const InteractiveFormAdd = () => {
  const {watch, setValue} = useFormContext();
  const fileTypeSelected = watch('interactive_add.file_type');
  const floorPrice = watch('floor_price');
  const isStandard = fileTypeSelected?.value === InteractiveFileType.STANDARD;
  const playTypeOptions = isStandard
    ? getInteractiveStandardPlayTypeOptions()
    : getInteractivePlayTypeOptions();
  const customPlayTypeDataValues = watch('custom_play_type_data');
  const playTypeSelected = customPlayTypeDataValues?.map(
    item => item?.play_type?.value
  );
  const playTypeOptionsFiltered = playTypeOptions?.filter(
    item => !playTypeSelected.includes(item?.value)
  );

  React.useEffect(() => {
    if (isStandard) {
      setValue('interactive_add.price', floorPrice);
      setValue(
        'interactive_add.play_type',
        getInteractiveStandardPlayTypeOptions()?.find(
          item => item.value === 'standard'
        )
      );
    } else {
      setValue('interactive_add.price', '');
      setValue('interactive_add.price', null);
    }
  }, [floorPrice, isStandard, setValue]);

  return (
    <Collapse title="Add new" initialOpen unMount={false}>
      <Row>
        <Col sm="4">
          <FormReactSelect
            options={getInteractiveFileTypeOptions()}
            label="File type"
            placeholder="File type"
            name="interactive_add.file_type"
          />
        </Col>
        <Col sm="4">
          <InteractivePlayTypeSelect
            playTypeOptions={playTypeOptionsFiltered}
          />
        </Col>
        <Col sm="4">
          <CurrencyInputField
            label="Price"
            placeholder="price"
            name="interactive_add.price"
            defaultValue={isStandard ? floorPrice : ''}
            readOnly={isStandard}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
          />
        </Col>
        <Col sm="12">
          <FormCodeMirror
            name="interactive_add.meta"
            label="Meta"
            extension="JSON"
            showError={false}
          />
        </Col>
      </Row>
    </Collapse>
  );
};

export default InteractiveFormAdd;
