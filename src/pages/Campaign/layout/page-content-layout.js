import {PageTitleAlt} from 'components/layouts/Admin/components';
import PropTypes from 'prop-types';
import * as React from 'react';
import {Col, Container, Row} from 'reactstrap';

const propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  children: PropTypes.node
};

function CampaignContentLayout(props) {
  const {
    children,
    heading = '',
    subHeading = '',
    actionPageTitle = null
  } = props;

  return (
    <>
      <PageTitleAlt
        icon="pe-7s-network icon-gradient bg-tempting-azure"
        heading={heading}
        subheading={subHeading}
        {...actionPageTitle}
      />
      <Container fluid>
        <Row>
          <Col sm={12}>{children}</Col>
        </Row>
      </Container>
    </>
  );
}

CampaignContentLayout.propTypes = propTypes;

export default CampaignContentLayout;
