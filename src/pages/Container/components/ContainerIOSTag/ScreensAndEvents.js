import React from 'react';
import {Row, Col} from 'reactstrap';
// import { useParams } from 'react-router-dom';

// components
import PageLayout from '../PageLayout';
import Screen from './Screen';
import {useGetPage} from 'queries/page';
import {getContainerTags} from 'pages/Container/constants';

// queries, mutations
// import {useGetPageTypes, useGetPageTags} from 'core/queries/containers';

function ScreensAndEvents({tabProps: {title}, pageId, children}) {
  // const {tag} = useParams();
  const {data: page, status, isFetching} = useGetPage(pageId);
  const pageTags = getContainerTags();

  const hasPage = !!page;

  const isLoading = status === 'loading' || isFetching;

  return (
    <PageLayout
      title={title}
      hasPage={hasPage}
      pageTags={pageTags}
      pageName={page?.name}
      pageId={page?.uuid}
      source={page?.source}
      isIOS
    >
      <Row>
        <Col sm="12" md="7">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <Screen pageTags={pageTags} page={page} />
          )}
        </Col>
        <Col sm="12" md="5">
          {isLoading ? <div>Loading...</div> : children}
        </Col>
      </Row>
    </PageLayout>
  );
}

export default React.memo(ScreensAndEvents);
