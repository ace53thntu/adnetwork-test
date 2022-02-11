import {Collapse} from 'components/common';
import {FormReactSelect, FormTextInput} from 'components/forms';
import {WEEK_DAYS} from 'pages/Campaign/constants';
import React from 'react';
import {useFormContext, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Col, Row} from 'reactstrap';
import timezones from 'timezones-list';

const timezoneOptions = timezones.map(item => ({
  ...item,
  value: item.utc,
  label: item.name
}));

const ScheduleGroup = () => {
  const {t} = useTranslation();
  const {control} = useFormContext();
  const timezoneSelected = useWatch({name: 'time_zone', control});
  console.log(
    '🚀 ~ file: ScheduleGroup.js ~ line 17 ~ ScheduleGroup ~ timezoneSelected',
    timezoneSelected
  );
  console.log('current tz', Intl.DateTimeFormat().resolvedOptions().timeZone);
  return (
    <Collapse initialOpen={true} title={t('schedule')} unMount={false}>
      <Row>
        <Col md="6">
          <FormReactSelect
            required
            name="week_days"
            label={'Week days'}
            placeholder={'Select'}
            options={WEEK_DAYS}
            multiple
          />
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <FormTextInput
            type="number"
            min="0"
            placeholder={'Start hour'}
            id={'startHour'}
            name={'start_hour'}
            label={'Start hour'}
            isRequired={false}
          />
        </Col>
        <Col md="6">
          <FormTextInput
            type="number"
            min="0"
            placeholder={'Start minute'}
            id={'startMinute'}
            name={'start_minute'}
            label={'Start minute'}
            isRequired={false}
          />
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <FormTextInput
            type="number"
            min="0"
            placeholder={'End hour'}
            id={'endHour'}
            name={'end_hour'}
            label={'End hour'}
            isRequired={false}
          />
        </Col>
        <Col md="6">
          <FormTextInput
            type="number"
            min="0"
            placeholder={'End minute'}
            id="timeZone"
            name={'end_minute'}
            label={'End minute'}
            isRequired={false}
          />
        </Col>
        <Col md="6">
          <FormReactSelect
            required
            name="time_zone"
            label="Time zone"
            placeholder={'Select...'}
            options={timezoneOptions}
          />
        </Col>
      </Row>
    </Collapse>
  );
};

export default ScheduleGroup;
