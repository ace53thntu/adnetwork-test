import {Collapse} from 'components/common';
import {FormReactSelect} from 'components/forms';
import ErrorMessage from 'components/forms/ErrorMessage';
import {WEEK_DAYS} from 'pages/Campaign/constants';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Col, Row} from 'reactstrap';
import TimePicker from './TimePicker';

const ScheduleGroup = () => {
  const {t} = useTranslation();
  const {errors} = useFormContext();

  return (
    <Collapse initialOpen={true} title={t('schedule')} unMount={false}>
      <Row>
        <Col md="6">
          <FormReactSelect
            required
            name="schedule.week_days"
            label={'Week days'}
            placeholder={'Select'}
            options={WEEK_DAYS}
            multiple
          />
          {errors?.schedule?.week_days && (
            <div style={{marginTop: '-16px', marginBottom: '16px'}}>
              <ErrorMessage
                message={errors?.schedule?.week_days?.message || ''}
              />
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <TimePicker name={'schedule.start_time'} label={'Start time'} />
        </Col>
        <Col md="6">
          <TimePicker name={'schedule.end_time'} label={'End time'} />
        </Col>
      </Row>
    </Collapse>
  );
};

export default ScheduleGroup;
