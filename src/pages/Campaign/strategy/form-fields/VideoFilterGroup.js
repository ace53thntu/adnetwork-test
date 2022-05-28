//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {Col, Row} from 'reactstrap';
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {Collapse} from 'components/common';
import {FormRadioGroup, FormReactSelect} from 'components/forms';
import {
  getSkippableOptions,
  PlacementTypeOptions,
  StartDelayOptions
} from 'pages/Campaign/constants';
import {LinearityOptions, ProtocolOptions} from 'constants/misc';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';
import ErrorMessage from 'components/forms/ErrorMessage';

const propTypes = {
  isView: PropTypes.bool,
  currentStrategy: PropTypes.object
};

const VideoFilterGroup = ({isView = false, currentStrategy}) => {
  const {t} = useTranslation();
  const {errors} = useFormContext();

  return (
    <Collapse initialOpen title={t('FORM.VIDEO_FILTER')} unMount={false}>
      <Row>
        <Col md="3">
          <CurrencyInputField
            name="video_filter.skip_delay"
            placeholder={t('FORM.SKIP_DELAY')}
            label={t('FORM.SKIP_DELAY')}
            disableGroupSeparators
            allowDecimals={false}
            disabled={isView}
          />
        </Col>
        <Col md="3">
          <FormReactSelect
            disabled={isView}
            defaultValue={currentStrategy?.video_filter?.start_delay}
            options={StartDelayOptions}
            name="video_filter.start_delay"
            placeholder={t('FORM.START_DELAY')}
            label={t('FORM.START_DELAY')}
            isClearable
          />
        </Col>
        <Col md="3">
          <FormReactSelect
            disabled={true}
            defaultValue={currentStrategy?.video_filter?.ptype}
            options={PlacementTypeOptions}
            name="video_filter.ptype"
            label={t('FORM.PLACEMENT_TYPE')}
            placeholder={t('FORM.PLACEMENT_TYPE')}
            isClearable
          />
        </Col>
        <Col md="3">
          <FormReactSelect
            disabled={isView}
            defaultValue={currentStrategy?.video_filter?.linearity}
            options={LinearityOptions}
            name="video_filter.linearity"
            label={t('FORM.LINEARITY')}
            placeholder={t('FORM.LINEARITY')}
            isClearable
          />
        </Col>
        <Col md="12">
          <FormReactSelect
            disabled={isView}
            defaultValue={currentStrategy?.video_filter?.protocols}
            options={ProtocolOptions}
            name="video_filter.protocols"
            label={t('FORM.PROTOCOLS')}
            placeholder={t('FORM.PROTOCOLS')}
            isClearable
          />
        </Col>
        <Col md="6">
          <FormRadioGroup
            inline
            disabled={isView}
            label={t('FORM.ONLY_SKIPABLE')}
            items={getSkippableOptions('skipable')}
            defaultValue={null}
            name="video_filter.only_skipable"
          />
        </Col>
        <Col md="6">
          <FormRadioGroup
            inline
            disabled={isView}
            label={t('FORM.ONLY_UNSKIPABLE')}
            items={getSkippableOptions('unskipable')}
            defaultValue={null}
            name="video_filter.only_unskipable"
          />
          {errors?.video_filter?.only_unskipable && (
            <ErrorMessage
              message={errors?.video_filter?.only_unskipable?.message}
            />
          )}
        </Col>
      </Row>
    </Collapse>
  );
};

VideoFilterGroup.propTypes = propTypes;

export default VideoFilterGroup;
