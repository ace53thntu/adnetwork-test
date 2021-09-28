/**
 * Copyright (c) 2021-present, AiCactus, Inc.
 * All rights reserved.
 *
 * @flow
 */

import React from 'react';
import {Col, Row} from 'reactstrap';
import {AudienceSelect, DealSelect, DspSelect} from './form-elements';
import TimeRange from './form-elements/time-range';

export default function DealForm({dspOptions, audienceOptions, dealOptions}) {
  return (
    <>
      <Row className="mt-3">
        <Col sm="4">
          <DspSelect options={dspOptions} />
        </Col>
        <Col sm="4">
          <AudienceSelect options={audienceOptions} />
        </Col>
        <Col sm="4">
          <DealSelect options={dealOptions} />
        </Col>
      </Row>
      <TimeRange />
    </>
  );
}
