//---> Build-in
import React from 'react';

//---> External Modules
import {Controller, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Col, FormGroup, Label, Row} from 'reactstrap';
import DatePicker from 'react-datepicker';

//---> Internal Modules
import StartAt from './start-at';
import {INPUTS_NAME} from 'pages/InventoryMarket/constants';

export default function TimeRange() {
  const {t} = useTranslation();
  const {control, errors, register} = useFormContext();

  React.useEffect(() => {
    register([INPUTS_NAME.END_AT]);
  }, [register]);

  return (
    <Row className="mt-3">
      <Col xs="6">
        <FormGroup>
          <Label for="startDate">
            <span className="text-danger">*</span>
            {t('startDate')}
          </Label>
          <StartAt />
          {errors && errors[INPUTS_NAME.START_AT] ? (
            <div className="invalid-feedback d-block">
              {errors[INPUTS_NAME.START_AT]?.message}
            </div>
          ) : null}
        </FormGroup>
      </Col>
      <Col xs="6">
        <FormGroup>
          <Label for="endDate">
            <span className="text-danger">*</span>
            {t('endDate')}
          </Label>
          <Controller
            control={control}
            name={INPUTS_NAME.END_AT}
            render={({onChange, onBlur, value, name}) => (
              <DatePicker
                selected={value}
                onChange={date => onChange(date)}
                className="form-control"
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/mm/yyyy"
              />
            )}
          />
          {errors && errors[INPUTS_NAME.END_AT] ? (
            <div className="invalid-feedback d-block">
              {errors[INPUTS_NAME.END_AT]?.message}
            </div>
          ) : null}
        </FormGroup>
      </Col>
    </Row>
  );
}
