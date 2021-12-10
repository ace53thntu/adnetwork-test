import * as React from 'react';
import {useParams} from 'react-router';
import {Col, Container, Row} from 'reactstrap';
import {useRedirectInContainer} from 'pages/Container/hooks/useRedirectInContainer';

import {
  SOURCE_HEADINGS,
  SOURCE_SUB_HEADINGS
} from '../ContainerSourcePage/constants';
import {ContainerBodyLayout} from '../Layouts';

function ContainerSource(props) {
  const {source} = useParams();
  const {isFetching, isError, error} = useRedirectInContainer();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <ContainerBodyLayout
        heading={SOURCE_HEADINGS[source]}
        subHeading={SOURCE_SUB_HEADINGS[source]}
      >
        <Container fluid>
          <Row>
            <Col>{error?.message ?? 'Something went wrong.'}</Col>
          </Row>
        </Container>
      </ContainerBodyLayout>
    );
  }

  return null;
}

ContainerSource.propTypes = {};
ContainerSource.defaultProps = {};

export default ContainerSource;
