import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {Container, Row, Col} from 'reactstrap';

//---> Internal Modules
import {PageTitleAlt} from 'components/layouts/Admin/components';

const propTypes = {
  heading: PropTypes.string
};

const AudienceContentLayout = ({heading, children}) => {
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
};

AudienceContentLayout.propTypes = propTypes;

export default React.memo(AudienceContentLayout);
