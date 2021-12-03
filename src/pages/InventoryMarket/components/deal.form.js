/**
 * Copyright (c) 2021-present, AiCactus, Inc.
 * All rights reserved.
 *
 * @flow
 */

import {ActiveToogle, FormTextInput} from 'components/forms';
import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {Col, Label, Row} from 'reactstrap';
import {INPUTS_NAME} from '../constants';
import {AudienceSelect, DspSelect} from './form-elements';
import TimeRange from './form-elements/time-range';

export default function DealForm({
  dspOptions,
  audienceOptions,
  excludeDates = []
}) {
  const {control} = useFormContext();
  return (
    <>
      <Row className="mt-3">
        <Col sm="8">
          <FormTextInput
            name={INPUTS_NAME.NAME}
            label="Name"
            placeholder="Deal name"
            isRequired
          />
        </Col>
        <Col sm="4">
          <Label className="mr-5">Status</Label>
          <Controller
            control={control}
            name={INPUTS_NAME.STATUS}
            defaultValue={'active'}
            render={({onChange, onBlur, value, name}) => (
              <ActiveToogle value={value} onChange={onChange} />
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="6">
          <DspSelect options={dspOptions} />
        </Col>
        <Col sm="6">
          <AudienceSelect options={audienceOptions} />
        </Col>
      </Row>
      <TimeRange excludeDates={excludeDates} />
    </>
  );
}
