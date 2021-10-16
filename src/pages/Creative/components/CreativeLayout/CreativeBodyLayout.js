import {PageTitleAlt} from 'components/layouts/Admin/components';
import PropTypes from 'prop-types';
import * as React from 'react';
import {Col, Container, Row} from 'reactstrap';

function CreativeBodyLayout(props) {
  const {children, heading} = props;

  return (
    <>
      <PageTitleAlt
        heading={heading}
        icon="pe-7s-glasses icon-gradient bg-love-kiss"
      />
      <Container fluid>
        <Row>
          <Col sm={12}>{children}</Col>
        </Row>
      </Container>
    </>
  );
}

CreativeBodyLayout.propTypes = {
  heading: PropTypes.string
};
CreativeBodyLayout.defaultProps = {
  heading: ''
};

export default CreativeBodyLayout;
