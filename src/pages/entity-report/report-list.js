//---> External Modules
import PropTypes from 'prop-types';
//---> Build-in Modules
import React from 'react';
import {Card, CardBody, Col, Row} from 'reactstrap';
import NoReportAvailable from './components/NoReportAvailable';

//---> Internal Modules
import ReportItemContainer from './ReportItemContainer';

const ReportList = ({
  reports = [],
  entityId,
  entityType,
  metricType,
  distributionBy
}) => {
  return (
    <Row>
      {reports?.map((reportItem = {}) => {
        const {uuid: id, status} = reportItem;

        return status === 'active' ? (
          <Col key={`pr-${id}`} sm={6} className="mb-3">
            <Card className="chart-item">
              <CardBody style={{padding: 0}}>
                <ReportItemContainer report={reportItem} />
              </CardBody>
            </Card>
          </Col>
        ) : null;
      })}
      {(!reports || reports.length === 0) && (
        <Col sm={12}>
          <NoReportAvailable />
        </Col>
      )}
    </Row>
  );
};

ReportList.propTypes = {
  reports: PropTypes.array,
  entityId: PropTypes.string,
  entityType: PropTypes.string,
  metricType: PropTypes.string,
  distributionBy: PropTypes.string
};

export default React.memo(ReportList);
