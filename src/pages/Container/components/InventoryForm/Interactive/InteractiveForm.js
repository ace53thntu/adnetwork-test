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
  const {control, watch} = useFormContext();
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

  function handleAddNewInteractive() {
    append({
      file_type: watchFormAddFields['interactive_add.file_type'],
      play_type: watchFormAddFields['interactive_add.play_type'],
      price: watchFormAddFields['interactive_add.price'],
      meta: watchFormAddFields['interactive_add.meta']
    });
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
