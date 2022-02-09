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
import TimeRange from './form-elements/time-range';
import {ActiveToggle, FormTextInput} from 'components/forms';
import {INPUTS_NAME} from '../constants';
import {Controller, useFormContext} from 'react-hook-form';
import DspSelect from 'components/forms/DspSelect';
import {useTranslation} from 'react-i18next';
import AudienceSelect from 'components/forms/AudienceSelect';

const InventoryBidForm = ({excludeBidDates = []}) => {
  const {t} = useTranslation();
  const {control} = useFormContext();

  return (
    <>
      <Row className="mt-3">
        <Col sm="4">
          <DspSelect
            name={INPUTS_NAME.DSP_UUID}
            label={t('dsp')}
            placeholder={t('selectDsp')}
            defaultValue={null}
          />
        </Col>
        <Col sm="4">
          <AudienceSelect
            name={INPUTS_NAME.AUDIENCE_UUID}
            label={t('audience')}
            placeholder={t('selectAudience')}
            defaultValue={null}
            multiple
          />
        </Col>
        <Col sm="4">
          <Label className="mr-5">Header bidding</Label>
          <Controller
            control={control}
            name={INPUTS_NAME.HEADER_BIDDING}
            defaultValue={'active'}
            render={({onChange, onBlur, value, name}) => (
              <ActiveToggle value={value} onChange={onChange} />
            )}
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
              <ActiveToggle value={value} onChange={onChange} />
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
