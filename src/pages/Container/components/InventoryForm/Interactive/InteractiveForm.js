//---> Build-in Modules
import React from 'react';
import {useFieldArray, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

//---> External Modules
import {Button, Col, Row} from 'reactstrap';
import InteractiveFormAdd from './InteractiveFormAdd';
import InteractiveItem from './InteractiveItem';

const InteractiveForm = () => {
  const {t} = useTranslation();
  const {control, watch, setValue, trigger, errors} = useFormContext();
  console.log(
    '🚀 ~ file: InteractiveForm.js ~ line 14 ~ InteractiveForm ~ errors',
    errors
  );
  const {fields, append, remove} = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'custom_play_type_data' // unique name for your Field Array
  });
  const watchFormAddFields = watch([
    'interactive_add.file_type',
    'interactive_add.play_type',
    'interactive_add.price',
    'interactive_add.meta'
  ]);

  const fileTypeSelected = watch('interactive_add.file_type');
  const playTypeInAddSelected = watch('interactive_add.play_type');
  const isDisableAddBtn =
    !fileTypeSelected || !playTypeInAddSelected || errors?.interactive_add;

  async function handleAddNewInteractive() {
    const result = await trigger('interactive_add.meta');
    console.log(
      '🚀 ~ file: InteractiveForm.js ~ line 31 ~ handleAddNewInteractive ~ result',
      result
    );
    if (!result) {
      return;
    }
    append({
      file_type: watchFormAddFields['interactive_add.file_type'],
      play_type: watchFormAddFields['interactive_add.play_type'],
      price: watchFormAddFields['interactive_add.price'],
      meta: watchFormAddFields['interactive_add.meta']
    });
    setValue('interactive_add.file_type', null);
    setValue('interactive_add.play_type', null);
    setValue('interactive_add.price', '');
    setValue('interactive_add.meta', '');
  }

  function handleRemoveInteractive(index) {
    remove(index);
  }

  return (
    <div>
      {fields?.map((fieldItem, index) => {
        return (
          <InteractiveItem
            key={`pr-${fieldItem?.play_type?.value}`}
            index={index}
            fieldItem={fieldItem}
            onClickRemove={handleRemoveInteractive}
          />
        );
      })}

      <InteractiveFormAdd />
      <Row>
        <Col sm="12">
          <div className="d-flex justify-content-end">
            <Button
              color="primary"
              type="button"
              className="mr-2"
              onClick={handleAddNewInteractive}
              disabled={isDisableAddBtn}
            >
              {t('add')}
            </Button>
            <Button type="button">{t('cancel')}</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default InteractiveForm;
