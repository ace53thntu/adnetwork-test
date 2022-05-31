//---> Build-in Modules
import React from 'react';

///---> External Modules
import {useTranslation} from 'react-i18next';
import {Col, Row} from 'reactstrap';
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {Collapse} from 'components/common';
import {FormRadioGroup, FormReactSelect} from 'components/forms';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';
import {LinearityOptions} from 'constants/misc';
import {getSkippableOptions, StartDelayOptions} from 'pages/Campaign/constants';
import Protocol from './Protocol';
import VideoMime from './VideoMime';

const VideoGroup = ({currentInventory}) => {
  const {t} = useTranslation();
  const {formState, watch, setValue} = useFormContext();
  const skip = watch('metadata.skip');

  React.useEffect(() => {
    if (skip !== 'true') {
      setValue('metadata.skip_after', '');
      setValue('metadata.skip_min', '');
    }
  }, [setValue, skip]);

  return (
    <Collapse initialOpen title={t('FORM.VIDEO_CONFIGURATION')} unMount={false}>
      <Row>
        <Col sm={6}>
          <CurrencyInputField
            name="metadata.min_bitrate"
            placeholder={t('minBitrate')}
            label={t('minBitrate')}
            disableGroupSeparators
            allowDecimals={false}
            disabled={formState.isSubmitting}
          />
        </Col>
        <Col sm={6}>
          <CurrencyInputField
            name="metadata.max_bitrate"
            placeholder={t('maxBitrate')}
            label={t('maxBitrate')}
            disableGroupSeparators
            allowDecimals={false}
            disabled={formState.isSubmitting}
          />
        </Col>
        <Col sm={6}>
          <CurrencyInputField
            name="metadata.min_duration"
            placeholder={t('minDuration')}
            label={t('minDuration')}
            disableGroupSeparators
            allowDecimals={false}
            disabled={formState.isSubmitting}
          />
        </Col>
        <Col sm={6}>
          <CurrencyInputField
            name="metadata.max_duration"
            placeholder={t('maxDuration')}
            label={t('maxDuration')}
            disableGroupSeparators
            allowDecimals={false}
            disabled={formState.isSubmitting}
          />
        </Col>

        <Col md="6">
          <CurrencyInputField
            name="metadata.skip_after"
            placeholder={t('FORM.SKIP_AFTER')}
            label={t('FORM.SKIP_AFTER')}
            disableGroupSeparators
            allowDecimals={false}
            disabled={formState.isSubmitting}
            readOnly={skip !== 'true'}
          />
        </Col>
        <Col md="6">
          <CurrencyInputField
            name="metadata.skip_min"
            placeholder={t('FORM.SKIP_MIN')}
            label={t('FORM.SKIP_MIN')}
            disableGroupSeparators
            allowDecimals={false}
            disabled={formState.isSubmitting}
            readOnly={skip !== 'true'}
          />
        </Col>

        <Col md="6">
          <FormReactSelect
            defaultValue={currentInventory?.metadata?.start_delay}
            options={StartDelayOptions}
            name="metadata.start_delay"
            placeholder={t('FORM.START_DELAY')}
            label={t('FORM.START_DELAY')}
            isClearable
          />
        </Col>
        <Col sm={6}>
          <FormReactSelect
            name="metadata.linearity"
            label={t('FORM.LINEARITY')}
            placeholder={t('FORM.SELECT_LINEARITY')}
            options={LinearityOptions}
            disabled={formState.isSubmitting}
            isClearable
          />
        </Col>
        <Col sm="12">
          <Protocol />
        </Col>
        <Col sm={12}>
          <VideoMime />
        </Col>
        <Col sm="6">
          <FormRadioGroup
            inline
            disabled={formState.isSubmitting}
            label={t('COMMON.LOOP')}
            items={getSkippableOptions('loop')}
            defaultValue={null}
            name="metadata.loop"
          />
        </Col>
        <Col sm="6">
          <FormRadioGroup
            inline
            disabled={formState.isSubmitting}
            label={t('FORM.SKIP')}
            items={getSkippableOptions('skip')}
            defaultValue={null}
            name="metadata.skip"
          />
        </Col>
      </Row>
    </Collapse>
  );
};

export default VideoGroup;
