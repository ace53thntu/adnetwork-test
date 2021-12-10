import PropTypes from 'prop-types';
import * as React from 'react';
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';

import {PageInformation} from '../PageInformation';
import HeaderActions from './HeaderActions';

function PagesAndEventsTab(props) {
  const {tabProps, children} = props;

  return (
    <Row>
      <Col sm={12}>
        <Card className="main-card mb-3">
          <CardHeader>
            {tabProps.title}
            {<HeaderActions />}
          </CardHeader>
          <CardBody>
            <Row>
              <Col sm="12" md="7">
                <PageInformation />
              </Col>
              <Col sm="12" md="5">
                {children}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

PagesAndEventsTab.propTypes = {
  tabProps: PropTypes.object
};
PagesAndEventsTab.defaultProps = {};

export default PagesAndEventsTab;
