import React from 'react';

import {Col, Row} from 'reactstrap';

import {EndTime} from './EndTime';
import StartTime from './StartTime';

const TimePeriod = () => {
  return (
    <Row>
      <Col xs="6">
        <StartTime />
      </Col>
      <Col xs="6">
        <EndTime />
      </Col>
    </Row>
  );
};

export default TimePeriod;
