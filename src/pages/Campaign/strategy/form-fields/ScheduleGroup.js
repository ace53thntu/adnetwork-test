import {CollapseBox} from 'components/common';
import {FormReactSelect} from 'components/forms';
import {WEEK_DAYS} from 'pages/Campaign/constants';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Col, Row} from 'reactstrap';
import TimePicker from './TimePicker';

const ScheduleGroup = () => {
  const {t} = useTranslation();

  return (
    <CollapseBox initialOpen={true} title={t('schedule')} unMount={false}>
      <ScheduleFormFields
        weekDayName="schedule.week_days"
        startTimeName="schedule.start_time"
        endTimeName="schedule.end_time"
      />
    </CollapseBox>
  );
};

export const ScheduleFormFields = ({
  weekDayName,
  startTimeName,
  endTimeName
}) => {
  return (
    <>
      <Row>
        <Col md="12">
          <FormReactSelect
            name={weekDayName}
            label={'Week days'}
            placeholder={'Select'}
            options={WEEK_DAYS}
            multiple
          />
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <TimePicker name={startTimeName} label={'Start time'} />
        </Col>
        <Col md="6">
          <TimePicker name={endTimeName} label={'End time'} />
        </Col>
      </Row>
    </>
  );
};

export default ScheduleGroup;
