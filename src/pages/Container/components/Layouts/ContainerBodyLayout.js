import {PageTitleAlt} from 'components/layouts/Admin/components';
import PropTypes from 'prop-types';
import * as React from 'react';
import {Col, Container, Row} from 'reactstrap';
import {PageCreateModal} from '../PageCreate';

// import {PageCreateModal} from '../PageCreate';

function ContainerBodyLayout(props) {
  const {children, heading, subHeading} = props;

  return (
    <>
      <PageTitleAlt
        icon="pe-7s-box1 icon-gradient bg-tempting-azure"
        heading={heading}
        subheading={subHeading}
      />
      <Container fluid>
        <Row>
          <Col sm={12}>{children}</Col>
        </Row>
      </Container>

      <PageCreateModal />
    </>
  );
}

ContainerBodyLayout.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  children: PropTypes.node
};
ContainerBodyLayout.defaultProps = {
  heading: '',
  subHeading: ''
};

export default ContainerBodyLayout;
