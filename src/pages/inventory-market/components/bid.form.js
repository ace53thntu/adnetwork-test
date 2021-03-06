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
import {ActiveToggle} from 'components/forms';
import {INPUTS_NAME} from '../constants';
import {Controller, useFormContext, useWatch} from 'react-hook-form';
import DspSelect from 'components/forms/DspSelect';
import {useTranslation} from 'react-i18next';
import AudienceSelect from 'components/forms/AudienceSelect';
import {CurrencyInputField} from 'components/forms/CurrencyInputField';

const InventoryBidForm = ({excludeDates = [], inventoryId = ''}) => {
  const {t} = useTranslation();
  const {control} = useFormContext();
  const dspSelected = useWatch({name: INPUTS_NAME.DSP_UUID, control});

  return (
    <>
      <Row className="mt-3">
        <Col sm="4">
          <DspSelect
            name={INPUTS_NAME.DSP_UUID}
            label={t('dsp')}
            placeholder={t('selectDsp')}
            defaultValue={null}
            inventoryId={inventoryId}
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
        {dspSelected?.header_bidding_available && (
          <Col sm="4">
            <Label className="mr-5">Header bidding</Label>
            <Controller
              control={control}
              name={INPUTS_NAME.HEADER_BIDDING}
              defaultValue={'inactive'}
              render={({onChange, onBlur, value, name}) => (
                <ActiveToggle value={value} onChange={onChange} />
              )}
            />
          </Col>
        )}
      </Row>
      <Row className="mt-3">
        <Col sm="4">
          <CurrencyInputField
            name={`${INPUTS_NAME.BUDGET}.${INPUTS_NAME.GLOBAL}`}
            placeholder="0.0"
            label={t('COMMON.BUDGET_GLOBAL')}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
            required
          />
        </Col>
        <Col sm="4">
          <CurrencyInputField
            name={`${INPUTS_NAME.BUDGET}.${INPUTS_NAME.DAILY}`}
            placeholder="0.0"
            label={t('COMMON.BUDGET_DAILY')}
            decimalSeparator="."
            groupSeparator=","
            disableGroupSeparators={false}
            decimalsLimit={3}
            prefix="$"
            required
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
      <TimeRange excludeDates={excludeDates} />
    </>
  );
};

InventoryBidForm.propTypes = {
  excludeDates: PropTypes.array,
  inventoryId: PropTypes.string
};

export default InventoryBidForm;
