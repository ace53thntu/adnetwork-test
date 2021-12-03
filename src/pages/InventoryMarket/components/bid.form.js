/**
 * Copyright (c) 2021-present, AiCactus, Inc.
 * All rights reserved.
 *
 * @flow
 */

//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {Col, Label, Row} from 'reactstrap';

//---> Internal Modules
import {AudienceSelect, DspSelect} from './form-elements';
import TimeRange from './form-elements/time-range';
import {ActiveToogle, FormTextInput} from 'components/forms';
import {INPUTS_NAME} from '../constants';
import {Controller, useFormContext} from 'react-hook-form';

const InventoryBidForm = ({
  dspOptions = [],
  audienceOptions = [],
  excludeBidDates = []
}) => {
  const {control} = useFormContext();

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
          <FormTextInput
            name={INPUTS_NAME.HEADER_BIDDING}
            label="Header bidding"
            placeholder="0"
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col sm="4">
          <FormTextInput
            name={`${INPUTS_NAME.BUDGET}.${INPUTS_NAME.GLOBAL}`}
            label="Budget global"
            placeholder="0"
          />
        </Col>
        <Col sm="4">
          <FormTextInput
            name={`${INPUTS_NAME.BUDGET}.${INPUTS_NAME.DAILY}`}
            label="Budget daily"
            placeholder="0"
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
      <TimeRange excludeDates={excludeBidDates} />
    </>
  );
};

InventoryBidForm.propTypes = {
  dspOptions: PropTypes.array,
  audienceOptions: PropTypes.array
};

export default InventoryBidForm;
