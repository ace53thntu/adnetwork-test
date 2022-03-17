//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useFormContext, useWatch} from 'react-hook-form';
import {Col, FormGroup, Label, Row} from 'reactstrap';
import {useTranslation} from 'react-i18next';

//---> Internal Modules
import {FormReactSelect, FormTextInput, FormToggle} from 'components/forms';
import {getInventoryTags} from 'pages/Container/constants';
import ColorPicker from 'components/forms/ColorPicker';
import {ProtocolOptions} from 'constants/misc';
import FormCodeMirror from 'components/forms/FormCodeMirror';
import {getRole} from 'utils/helpers/auth.helpers';
import {USER_ROLE} from 'pages/user-management/constants';

const InventoryProperty = ({currentInventory = null}) => {
  const {t} = useTranslation();
  const role = getRole();

  const {formState, control} = useFormContext();
  const inventoryTags = getInventoryTags();
  const formatTypeSelected = useWatch({name: 'format', control});

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
      {formatTypeSelected?.value === 'video' && (
        <Row>
          <Col sm={3}>
            <FormTextInput
              name="metadata.min_bitrate"
              placeholder="0"
              label={t('minBitrate')}
              disable={formState.isSubmitting}
            />
          </Col>
          <Col sm={3}>
            <FormTextInput
              name="metadata.max_bitrate"
              placeholder="0"
              label={t('maxBitrate')}
              disable={formState.isSubmitting}
            />
          </Col>
          <Col sm={3}>
            <FormTextInput
              name="metadata.min_duration"
              placeholder="0"
              label={t('minDuration')}
              disable={formState.isSubmitting}
            />
          </Col>
          <Col sm={3}>
            <FormTextInput
              name="metadata.max_duration"
              placeholder="0"
              label={t('maxDuration')}
              disable={formState.isSubmitting}
            />
          </Col>
          <Col sm="9">
            <FormReactSelect
              name="metadata.protocols"
              label={t('protocols')}
              placeholder={t('selectProtocol')}
              options={ProtocolOptions}
              multiple
            />
          </Col>
          <Col sm="3">
            <FormGroup className="d-flex justify-content-end flex-column mb-0">
              <Label>&nbsp;</Label>
              <FormToggle
                name="metadata.loop"
                defaultCheckedValue="active"
                label={t('COMMON.LOOP')}
                values={{
                  checked: 'active',
                  unChecked: 'inactive'
                }}
              />
            </FormGroup>
          </Col>
        </Row>
      )}

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
