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
  InteractiveFileType,
  InteractivePlayType,
  InteractiveStandardPlayType
} from '../constant';
import InteractivePlayTypeSelect from './InteractivePlayTypeSelect';
import ErrorMessage from 'components/forms/ErrorMessage';

const InteractiveFormAdd = () => {
  const {watch, setValue, errors} = useFormContext();
  const fileTypeSelected = watch('interactive_add.file_type');
  const playTypeSelected = watch('interactive_add.play_type');
  const floorPrice = watch('floor_price');
  const isStandard = fileTypeSelected?.value === InteractiveFileType.STANDARD;
  const playTypeOptions = isStandard
    ? getInteractiveStandardPlayTypeOptions()
    : getInteractivePlayTypeOptions();
  const customPlayTypeDataValues = watch('custom_play_type_data');
  const playTypeListSelected = customPlayTypeDataValues?.map(
    item => item?.play_type?.value
  );
  const playTypeOptionsFiltered = playTypeOptions?.filter(
    item => !playTypeListSelected.includes(item?.value)
  );

  React.useEffect(() => {
    if (isStandard) {
      setValue('interactive_add.price', floorPrice);
      if (
        !playTypeListSelected?.includes(InteractiveStandardPlayType.STANDARD)
      ) {
        setValue(
          'interactive_add.play_type',
          getInteractiveStandardPlayTypeOptions()?.find(
            item => item.value === 'standard'
          )
        );
      }
    } else {
      setValue('interactive_add.price', '');
      setValue('interactive_add.play_type', null);
    }
  }, [floorPrice, isStandard, playTypeListSelected, setValue]);

  React.useEffect(() => {
    if (
      playTypeSelected?.value === InteractivePlayType.INTERACTIVE_BANNER_MFV
    ) {
      setValue(
        'interactive_add.meta',
        JSON.stringify(
          {
            cross_time: 5
          },
          null,
          2
        )
      );
    }
  }, [playTypeSelected?.value, setValue]);

  return (
    <Collapse title="Add new" initialOpen unMount={false}>
      <Row>
        <Col sm="4">
          <FormReactSelect
            options={getInteractiveFileTypeOptions()}
            label="File type"
            placeholder="File type"
            name="interactive_add.file_type"
            required
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
            defaultValue={isStandard ? floorPrice?.toString() : ''}
            readOnly={isStandard}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
          />
        </Col>
        {/* TODO: validate Interactive banner MFV meta must has cross_price */}
        <Col sm="12">
          <FormCodeMirror
            name="interactive_add.meta"
            label="Meta"
            extension="JSON"
            showError={false}
          />
          {errors?.interactive_add?.meta && (
            <ErrorMessage
              message={errors?.interactive_add?.meta?.message || ''}
            />
          )}
        </Col>
      </Row>
    </Collapse>
  );
};

export default InteractiveFormAdd;
