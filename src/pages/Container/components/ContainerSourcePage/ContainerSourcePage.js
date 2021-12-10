// import PropTypes from 'prop-types';
import {useRedirectInContainer} from 'pages/Container/hooks/useRedirectInContainer';
import {useGetInventoryByPage} from 'queries/inventory';
import * as React from 'react';
import {useParams} from 'react-router';
import {Col, Container, Row} from 'reactstrap';

import {AndroidTag} from '../AndroidTag';
import {IosTag} from '../IosTag';
import {ContainerBodyLayout} from '../Layouts';
import {WebsiteTag} from '../WebsiteTag';
import {SOURCES, SOURCE_HEADINGS, SOURCE_SUB_HEADINGS} from './constants';

function ContainerSourcePage(props) {
  const {source, pageId} = useParams();

  const {isFetching, isError, error} = useRedirectInContainer();
  const {data: {items: inventories = []} = {}} = useGetInventoryByPage(pageId);

  const _renderBySource = () => {
    if (isError) {
      return (
        <Container fluid>
          <Row>
            <Col>{error?.message ?? 'Something went wrong.'}</Col>
          </Row>
        </Container>
      );
    }

    if (source === SOURCES.web) {
      return <WebsiteTag inventories={inventories} />;
    }
    if (source === SOURCES.android) {
      return <AndroidTag inventories={inventories} />;
    }
    if (source === SOURCES.ios) {
      return <IosTag inventories={inventories} />;
    }
  };

  return (
    <ContainerBodyLayout
      heading={SOURCE_HEADINGS[source]}
      subHeading={SOURCE_SUB_HEADINGS[source]}
    >
      {isFetching ? 'Loading...' : _renderBySource()}
    </ContainerBodyLayout>
  );
}

ContainerSourcePage.propTypes = {};
ContainerSourcePage.defaultProps = {};

export default ContainerSourcePage;
