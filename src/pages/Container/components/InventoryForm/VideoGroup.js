//---> Build-in Modules
import React from 'react';

///---> External Modules
import {useTranslation} from 'react-i18next';
import {Col, FormGroup, Row} from 'reactstrap';
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {Collapse} from 'components/common';
import {FormReactSelect, FormTextInput, FormToggle} from 'components/forms';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';
import {LinearityOptions, ProtocolOptions} from 'constants/misc';

const VideoGroup = ({isCreate = false}) => {
  const {t} = useTranslation();
  const {formState} = useFormContext();

  return (
    <Collapse initialOpen title={t('FORM.VIDEO_FILTER')} unMount={false}>
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
        <Col md="3">
          <CurrencyInputField
            name="metadata.skip_min"
            placeholder={t('FORM.SKIP_MIN')}
            label={t('FORM.SKIP_MIN')}
            disableGroupSeparators
            allowDecimals={false}
            disabled={formState.isSubmitting}
          />
        </Col>
        <Col md="3">
          <CurrencyInputField
            name="metadata.skip_after"
            placeholder={t('FORM.SKIP_AFTER')}
            label={t('FORM.SKIP_AFTER')}
            disableGroupSeparators
            allowDecimals={false}
            disabled={formState.isSubmitting}
          />
        </Col>
        <Col md="3">
          <CurrencyInputField
            name="metadata.start_delay"
            placeholder={t('FORM.START_DELAY')}
            label={t('FORM.START_DELAY')}
            disableGroupSeparators
            allowDecimals={false}
            disabled={formState.isSubmitting}
          />
        </Col>
        <Col sm={3}>
          <FormReactSelect
            name="metadata.linearity"
            label={t('FORM.LINEARITY')}
            placeholder={t('FORM.SELECT_LINEARITY')}
            options={LinearityOptions}
            disabled={formState.isSubmitting}
            isClearable={isCreate}
          />
        </Col>
        <Col sm="12">
          <FormReactSelect
            name="metadata.protocols"
            label={t('protocols')}
            placeholder={t('selectProtocol')}
            options={ProtocolOptions}
            disabled={formState.isSubmitting}
            multiple
          />
        </Col>
        <Col sm="3">
          <FormGroup className="d-flex justify-content-end flex-column mb-0">
            <FormToggle
              name="metadata.loop"
              defaultCheckedValue="active"
              label={t('COMMON.LOOP')}
              values={{
                checked: 'active',
                unChecked: 'inactive'
              }}
              disabled={formState.isSubmitting}
            />
          </FormGroup>
        </Col>
        <Col sm="3">
          <FormGroup className="d-flex justify-content-end flex-column mb-0">
            <FormToggle
              name="metadata.skip"
              defaultCheckedValue="inactive"
              label={t('FORM.SKIP')}
              values={{
                checked: 'active',
                unChecked: 'inactive'
              }}
              disabled={formState.isSubmitting}
            />
          </FormGroup>
        </Col>
      </Row>
    </Collapse>
  );
};

export default VideoGroup;
