//---> Internal Modules
import {PageTitleAlt} from 'components/layouts/Admin/components';
import AppContent from 'components/layouts/Admin/components/AppContent';
//---> External Modules
import PropTypes from 'prop-types';
//---> Build-in Modules
import React from 'react';
import {Col, Container, Row} from 'reactstrap';

const propTypes = {
  pageTitle: PropTypes.string
};

const TrackerTemplateLayout = ({children, pageTitle = ''}) => {
  return (
    <AppContent>
      <PageTitleAlt
        heading={pageTitle}
        subheading=""
        icon="pe-7s-map-2 icon-gradient bg-tempting-azure"
      />
      <Container fluid>
        <Row>
          <Col md="12">{children}</Col>
        </Row>
      </Container>
    </AppContent>
  );
};

TrackerTemplateLayout.propTypes = propTypes;

export default TrackerTemplateLayout;
