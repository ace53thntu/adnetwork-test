// import PropTypes from 'prop-types';
import {useRedirectInContainer} from 'pages/Container/hooks/useRedirectInContainer';
import * as React from 'react';
import {useParams} from 'react-router';
import {Col, Container, Row} from 'reactstrap';

import {AndroidTag} from '../AndroidTag';
import {AndroidTvTag} from '../AndroidTvTag';
import {IosTag} from '../IosTag';
import IosTvTag from '../IosTvTag/IosTvTag';
import {ContainerBodyLayout} from '../Layouts';
import TreeSelectContainer from '../TreeSelectContainer';
import {WebTvTag} from '../WebTvTag';
import {WebsiteTag} from '../WebsiteTag';
import {SOURCES, SOURCE_HEADINGS, SOURCE_SUB_HEADINGS} from './constants';

function ContainerSourcePage(props) {
  const {source} = useParams();
  const {isFetching, isError, error} = useRedirectInContainer();

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
      return <WebsiteTag />;
    }
    if (source === SOURCES.android) {
      return <AndroidTag />;
    }
    if (source === SOURCES.ios) {
      return <IosTag />;
    }
    if (source === SOURCES.webtv) {
      return <WebTvTag />;
    }
    if (source === SOURCES.androidtv) {
      return <AndroidTvTag />;
    }
    if (source === SOURCES.appletv) {
      return <IosTvTag />;
    }
  };

  return (
    <ContainerBodyLayout
      heading={SOURCE_HEADINGS[source]}
      subHeading={SOURCE_SUB_HEADINGS[source]}
    >
      <Row style={{paddingLeft: '15px'}}>
        <TreeSelectContainer />
      </Row>

      {isFetching ? 'Loading...' : _renderBySource()}
    </ContainerBodyLayout>
  );
}

ContainerSourcePage.propTypes = {};
ContainerSourcePage.defaultProps = {};

export default ContainerSourcePage;
