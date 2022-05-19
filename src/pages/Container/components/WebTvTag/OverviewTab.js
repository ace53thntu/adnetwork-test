import PropTypes from 'prop-types';
import * as React from 'react';
import {Card, CardHeader, Col, Row} from 'reactstrap';

import {ContainerSettings} from '../ContainerSettings';

function OverviewTab(props) {
  const {tabProps} = props;

  return (
    <Row>
      <Col sm={12}>
        <Card className="main-card mb-3">
          <CardHeader>{tabProps.title}</CardHeader>
          <ContainerSettings />
        </Card>
      </Col>
    </Row>
  );
}

OverviewTab.propTypes = {
  tabProps: PropTypes.object
};
OverviewTab.defaultProps = {};

export default OverviewTab;
