//---> External Modules
import PropTypes from 'prop-types';
//---> Build-in Modules
import React from 'react';
import {Card, CardBody, Col, Row} from 'reactstrap';

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
        console.log(
          '🚀 ~ file: report-list.js ~ line 22 ~ {reports?.map ~ reportItem',
          reportItem
        );

        return status === 'active' ? (
          <Col key={`pr-${id}`} sm={6} className="mb-3">
            <Card className="chart-item">
              <CardBody style={{padding: 0}}>
                <ReportItemContainer
                  reportItem={reportItem}
                ></ReportItemContainer>
              </CardBody>
            </Card>
          </Col>
        ) : null;
      })}
      {(!reports || reports.length === 0) && (
        <Col sm={12}>
          <div
            style={{
              textAlign: 'center',
              fontWeight: 600,
              width: '100%',
              backgroundColor: 'hsl(0,0%,95%)',
              padding: '15px 0'
            }}
          >
            No report
          </div>
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
