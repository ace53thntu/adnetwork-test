/**
 * Copyright (c) 2021-present, AiCactus, Inc.
 * All rights reserved.
 *
 * @flow
 */

import {ActiveToggle, FormTextInput} from 'components/forms';
import DspSelect from 'components/forms/DspSelect';
import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Col, Label, Row} from 'reactstrap';
import {INPUTS_NAME} from '../constants';
import TimeRange from './form-elements/time-range';

export default function DealForm({
  dspOptions,
  audienceOptions,
  excludeDates = []
}) {
  const {t} = useTranslation();
  const {control} = useFormContext();
  return (
    <>
      <Row className="mt-3">
        <Col sm="6">
          <FormTextInput
            name={INPUTS_NAME.NAME}
            label="Name"
            placeholder="Deal name"
            isRequired
          />
        </Col>
        <Col sm="3">
          <Label className="mr-5">Status</Label>
          <Controller
            control={control}
            name={INPUTS_NAME.STATUS}
            defaultValue={'active'}
            render={({onChange, onBlur, value, name}) => (
              <ActiveToggle value={value} onChange={onChange} />
            )}
          />
        </Col>
        <Col sm="3">
          <Label className="mr-5">{t('headerBidding')}</Label>
          <Controller
            control={control}
            name={INPUTS_NAME.HEADER_BIDDING}
            defaultValue={'inactive'}
            render={({onChange, onBlur, value, name}) => (
              <ActiveToggle value={value} onChange={onChange} />
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="6">
          <FormTextInput
            name={INPUTS_NAME.LIMIT_IMPRESSION}
            label="Limit impression"
            placeholder="0"
            isRequired
          />
        </Col>
        <Col sm="6">
          <FormTextInput
            name={INPUTS_NAME.DEAL_PRICE}
            label="Deal price"
            placeholder="0.0"
            isRequired
          />
        </Col>
        <Col sm="6">
          <DspSelect
            name={INPUTS_NAME.DSP_UUID}
            label={t('dsp')}
            placeholder={t('selectDsp')}
          />
        </Col>
      </Row>
      <TimeRange excludeDates={excludeDates} />
    </>
  );
}
