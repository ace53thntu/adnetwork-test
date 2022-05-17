//---> Build-in Modules
import React from 'react';

///---> External Modules
import {useTranslation} from 'react-i18next';
import {Col, FormGroup, Row} from 'reactstrap';
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {Collapse} from 'components/common';
import {FormReactSelect, FormToggle} from 'components/forms';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';
import {LinearityOptions, ProtocolOptions} from 'constants/misc';
import { VideoMineOptions } from 'constants/inventory';

const VideoGroup = ({isCreate = false}) => {
  const {t} = useTranslation();
  const {formState} = useFormContext();

  return (
    <Collapse initialOpen title={t('FORM.VIDEO_CONFIGURATION')} unMount={false}>
      <Row>
        <Col sm={3}>
          <CurrencyInputField
            name="metadata.min_bitrate"
            placeholder={t('minBitrate')}
            label={t('minBitrate')}
            disableGroupSeparators
            allowDecimals={false}
            disabled={formState.isSubmitting}
          />
        </Col>
        <Col sm={3}>
          <CurrencyInputField
            name="metadata.max_bitrate"
            placeholder={t('maxBitrate')}
            label={t('maxBitrate')}
            disableGroupSeparators
            allowDecimals={false}
            disabled={formState.isSubmitting}
          />
        </Col>
        <Col sm={3}>
          <CurrencyInputField
            name="metadata.min_duration"
            placeholder={t('minDuration')}
            label={t('minDuration')}
            disableGroupSeparators
            allowDecimals={false}
            disabled={formState.isSubmitting}
          />
        </Col>
        <Col sm={3}>
          <CurrencyInputField
            name="metadata.max_duration"
            placeholder={t('maxDuration')}
            label={t('maxDuration')}
            disableGroupSeparators
            allowDecimals={false}
            disabled={formState.isSubmitting}
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
        <Col sm={12}>
          <FormReactSelect
            name="metadata.mines"
            label={t('FORM.SUPPORT_MINES_TYPE')}
            placeholder={`Select ${t('FORM.SUPPORT_MINES_TYPE')}`}
            options={VideoMineOptions}
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
