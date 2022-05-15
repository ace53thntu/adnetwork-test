//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useFormContext, useWatch} from 'react-hook-form';
import {Col, Row} from 'reactstrap';
import {useTranslation} from 'react-i18next';

//---> Internal Modules
import {FormReactSelect, FormTextInput} from 'components/forms';
import {getInventoryTags} from 'pages/Container/constants';
import ColorPicker from 'components/forms/ColorPicker';
import FormCodeMirror from 'components/forms/FormCodeMirror';
import {getRole} from 'utils/helpers/auth.helpers';
import {USER_ROLE} from 'pages/user-management/constants';
import VideoGroup from './VideoGroup';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';

const InventoryProperty = ({currentInventory = null, isCreate = false}) => {
  const {t} = useTranslation();
  const role = getRole();

  const {formState, control, errors} = useFormContext();
  const inventoryTags = getInventoryTags();
  const formatTypeSelected = useWatch({name: 'format', control});

  return (
    <>
      <Row>
        <Col sm={4}>
          <CurrencyInputField
            name="metadata.width"
            placeholder={t('width')}
            label={t('width')}
            disableGroupSeparators
            allowDecimals={false}
            disabled={formState.isSubmitting}
            invalid={errors?.metadata?.width}
            required
          />
        </Col>
        <Col sm={4}>
          <CurrencyInputField
            name="metadata.height"
            placeholder={t('height')}
            label={t('height')}
            disableGroupSeparators
            allowDecimals={false}
            disabled={formState.isSubmitting}
            invalid={errors?.metadata?.height}
            required
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
      {formatTypeSelected?.value === 'video' && (
        <VideoGroup isCreate={isCreate} />
      )}

      <Row>
        <Col sm={12}>
          <FormTextInput
            name="metadata.extension"
            placeholder={t('extension')}
            label={t('extension')}
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
      {[USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(role) && (
        <Row className="mb-3">
          <Col sm={12} className="mt-2">
            <FormCodeMirror
              name="metadata.extra"
              label={t('FORM.EXTRA_FIELDS')}
              extension="JSON"
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default InventoryProperty;
