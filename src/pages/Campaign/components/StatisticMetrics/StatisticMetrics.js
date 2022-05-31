//---> Build-in Modules
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, DatePicker, Statistic, Card, Spin } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import moment from 'moment';
import './style.scss'
import { useGetTotalMetrics } from 'queries/metric/useGetTotalMetrics';
const { RangePicker } = DatePicker;

const propTypes = {
    campaignId: PropTypes.string.isRequired
};

const dateFormat = 'YYYY/MM/DD';
const currentTime = moment();
const detaultRangeTime = [moment().subtract(7, 'days').startOf('day'), currentTime];

const StatisticMetrics = ({ campaignId }) => {
    const [rangeTime, setRangeTime] = useState(detaultRangeTime);
    const { data, isFetching } = useGetTotalMetrics({
        data: {
            start_time: rangeTime[0].format(),
            end_time: rangeTime[1].format(),
            report_by: "campaign",
            report_by_uuid: campaignId,
            report_source: "campaign",
            report_type: "distribution",
            source_uuid: campaignId,
            time_unit: "day"
        },
        campaignId: campaignId,
        enabled: !!campaignId
    });
    const { statisticTotal } = data ?? {};
    const { impression = 0, click = 0, adrequest = 0, ctr = 0 } = statisticTotal ?? {};


    const onChange = (dates) => {
        if (dates) {
            setRangeTime(dates);
        }
    };

    return (
        <>
            {
                (<Spin size='large' spinning={isFetching} tip="Loading..." >
                    <Col className="statisticContainer" >
                        <Row justify='end'>
                            <RangePicker
                                value={rangeTime}
                                format={dateFormat}
                                ranges={{
                                    Today: [moment().startOf('day'), currentTime],
                                    Yesterday: [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
                                    'Last 7 days': [moment().subtract(7, 'days').startOf('day'), currentTime],
                                    'Last 30 days': [moment().subtract(30, 'days').startOf('day'), currentTime],
                                    'This Month': [moment().startOf('month'), currentTime],
                                    'Last Month': [moment().subtract(1, 'months').startOf('month'), moment().subtract(1, 'months').endOf('month')]
                                }}
                                onChange={onChange}
                            />
                        </Row>
                        <br />
                        <Row justify='space-between'>
                            <Col>
                                <Card className="cardStatistic">
                                    <Statistic title="Adrequest" value={adrequest} prefix={<LikeOutlined />} />
                                </Card>
                            </Col>
                            <Col>
                                <Card className="cardStatistic">
                                    <Statistic title="Impression" value={impression} prefix={<LikeOutlined />} />
                                </Card>
                            </Col>
                            <Col>
                                <Card className="cardStatistic">
                                    <Statistic title="Click" value={click} prefix={<LikeOutlined />} />
                                </Card>
                            </Col>
                            <Col>
                                <Card className="cardStatistic">
                                    <Statistic title="CTR" value={ctr} prefix={<LikeOutlined />} suffix=" %" />
                                </Card>
                            </Col>
                            <Col>
                                <Card className="cardStatistic">
                                    <Statistic title="Frequency capping" value={'--'} prefix={<LikeOutlined />} />
                                </Card>
                            </Col>
                            <Col>
                                <Card className="cardStatistic">
                                    <Statistic title="Viewable" value={'--'} prefix={<LikeOutlined />} />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Spin>)
            }
        </>
    )
};

StatisticMetrics.propTypes = propTypes;

export default StatisticMetrics;
