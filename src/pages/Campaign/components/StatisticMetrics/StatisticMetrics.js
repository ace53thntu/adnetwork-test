import './style.scss';

import {Card, Col, DatePicker, Row, Spin, Statistic} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import {useGetStatisticMetrics} from 'queries/metric/useGetStatisticMetrics';
//---> Build-in Modules
import React, {useState} from 'react';

import {
  DesktopOutlined,
  EyeOutlined,
  LikeOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import {convertLocalDateToTimezone} from 'utils/helpers/dateTime.helpers';
const {RangePicker} = DatePicker;

export const EnumTypeStatistics = {
  Campaign: 'campaign',
  Strategy: 'strategy'
};

const propTypes = {
  id: PropTypes.string.isRequired,
  reportType: PropTypes.oneOf([
    EnumTypeStatistics.Campaign,
    EnumTypeStatistics.Strategy
  ]),
  timeZone: PropTypes.number
};

const dateFormat = 'YYYY/MM/DD';
const currentTime = moment();
const defaultRangeTime = [
  moment().subtract(7, 'days').startOf('day'),
  currentTime
];

const StatisticMetrics = ({
  id,
  reportType = EnumTypeStatistics.Campaign,
  timeZone,
  originalTimezone
}) => {
  const [rangeTime, setRangeTime] = useState(defaultRangeTime);
  const startDate = convertLocalDateToTimezone({
    localDate: rangeTime?.[0]?.format(),
    timeZoneOffset: originalTimezone,
    isEndDate: false
  });
  const endDate = convertLocalDateToTimezone({
    localDate: rangeTime?.[1]?.format(),
    timeZoneOffset: originalTimezone,
    isEndDate: true
  });

  const {data, isFetching} = useGetStatisticMetrics({
    data: {
      start_time: startDate,
      end_time: endDate,
      report_by: reportType,
      report_source: reportType,
      report_by_uuid: id,
      source_uuid: id,
      report_type: 'distribution',
      time_unit: 'day',
      time_zone: timeZone
    },
    id,
    enabled: !!id
  });
  const {statisticTotal} = data ?? {};
  const {impression = 0, click = 0, adrequest = 0, ctr = 0} =
    statisticTotal ?? {};

  const onChange = dates => {
    if (dates) {
      setRangeTime(dates);
    }
  };

  return (
    <>
      {
        <Spin size="large" spinning={isFetching} tip="Loading...">
          <Col className="statisticContainer">
            <Row justify="end">
              <RangePicker
                value={rangeTime}
                format={dateFormat}
                ranges={{
                  Today: [moment().startOf('day'), currentTime],
                  Yesterday: [
                    moment().subtract(1, 'days').startOf('day'),
                    moment().subtract(1, 'days').endOf('day')
                  ],
                  'Last 7 days': [
                    moment().subtract(7, 'days').startOf('day'),
                    currentTime
                  ],
                  'Last 30 days': [
                    moment().subtract(30, 'days').startOf('day'),
                    currentTime
                  ],
                  'This Month': [moment().startOf('month'), currentTime],
                  'Last Month': [
                    moment().subtract(1, 'months').startOf('month'),
                    moment().subtract(1, 'months').endOf('month')
                  ]
                }}
                onChange={onChange}
              />
            </Row>
            <br />
            <Row justify="space-between">
              <Col>
                <Card className="cardStatistic">
                  <Statistic
                    title="Adrequest"
                    value={adrequest}
                    prefix={<DesktopOutlined />}
                  />
                </Card>
              </Col>
              <Col>
                <Card className="cardStatistic">
                  <Statistic
                    title="Impression"
                    value={impression}
                    prefix={<EyeOutlined />}
                  />
                </Card>
              </Col>
              <Col>
                <Card className="cardStatistic">
                  <Statistic
                    title="Click"
                    value={click}
                    prefix={<LikeOutlined />}
                  />
                </Card>
              </Col>
              <Col>
                <Card className="cardStatistic">
                  <Statistic
                    title="CTR"
                    value={ctr}
                    prefix={<PieChartOutlined />}
                    suffix=" %"
                  />
                </Card>
              </Col>
              <Col>
                <Card className="cardStatistic">
                  <Statistic
                    title="Frequency capping"
                    value={'--'}
                    prefix={<LikeOutlined />}
                  />
                </Card>
              </Col>
              <Col>
                <Card className="cardStatistic">
                  <Statistic
                    title="Viewable"
                    value={'--'}
                    prefix={<LikeOutlined />}
                  />
                </Card>
              </Col>
            </Row>
          </Col>
        </Spin>
      }
    </>
  );
};

StatisticMetrics.propTypes = propTypes;

export default React.memo(StatisticMetrics);
