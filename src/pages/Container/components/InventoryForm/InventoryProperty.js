//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useFormContext} from 'react-hook-form';
import {Col, Row} from 'reactstrap';
import {useTranslation} from 'react-i18next';

//---> Internal Modules
import {FormReactSelect, FormTextInput} from 'components/forms';
import {getInventoryTags} from 'pages/Container/constants';
import ColorPicker from 'components/forms/ColorPicker';

const InventoryProperty = ({currentInventory = null}) => {
  const {t} = useTranslation();
  const {formState} = useFormContext();
  const inventoryTags = getInventoryTags();

  return (
    <>
      <Row>
        <Col sm={4}>
          <FormTextInput
            name="metadata.width"
            placeholder="0"
            label={t('width')}
            disable={formState.isSubmitting}
            isRequired
          />
        </Col>
        <Col sm={4}>
          <FormTextInput
            name="metadata.height"
            placeholder="0"
            label={t('height')}
            disable={formState.isSubmitting}
            isRequired
          />
        </Col>
        <Col sm={4}>
          <ColorPicker
            name="metadata.background_color"
            label={t('backgroundColor')}
            defaultValue={currentInventory?.metadata?.background_color}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <FormTextInput
            name="metadata.extension"
            placeholder={t('extension')}
            label={t('extension')}
            disable={formState.isSubmitting}
          />
        </Col>
        <Col sm={4}>
          <FormTextInput
            name="metadata.duration"
            placeholder="0"
            label={t('duration')}
            disable={formState.isSubmitting}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <FormReactSelect
            name="tags"
            label={t('tags')}
            placeholder={t('selectTags')}
            optionLabelField="name"
            options={inventoryTags}
            disabled={formState.isSubmitting}
            multiple
          />
        </Col>
      </Row>
    </>
  );
};

export default InventoryProperty;
