//---> Build-in
import React from 'react';

//---> External Modules
import {useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Col, FormGroup, Label, Row} from 'reactstrap';

//---> Internal Modules
import StartAt from './start-at';
import {INPUTS_NAME} from 'pages/inventory-market/constants';
import EndAt from './end-at';

export default function TimeRange({excludeDates = []}) {
  const {t} = useTranslation();
  const {errors, register} = useFormContext();

  React.useEffect(() => {
    register([INPUTS_NAME.END_AT]);
  }, [register]);

  return (
    <Row>
      {/* BEGIN: Start date */}
      <Col xs="6">
        <FormGroup>
          <Label for="startDate">
            <span className="text-danger">*</span>
            {t('startDate')}
          </Label>
          <StartAt excludeDates={excludeDates} />
          {errors && errors[INPUTS_NAME.START_AT] ? (
            <div className="invalid-feedback d-block">
              {errors[INPUTS_NAME.START_AT]?.message}
            </div>
          ) : null}
        </FormGroup>
      </Col>
      {/* END: Start date */}

      {/* BEGIN: End date */}
      <Col xs="6">
        <FormGroup>
          <Label for="endDate">
            <span className="text-danger">*</span>
            {t('endDate')}
          </Label>
          <EndAt excludeDates={excludeDates} />
          {errors && errors[INPUTS_NAME.END_AT] ? (
            <div className="invalid-feedback d-block">
              {errors[INPUTS_NAME.END_AT]?.message}
            </div>
          ) : null}
        </FormGroup>
      </Col>
      {/* END: End date */}
    </Row>
  );
}
