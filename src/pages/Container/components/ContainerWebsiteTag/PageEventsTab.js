import React from 'react';
import {Row, Col} from 'reactstrap';

// components
import PageLayout from '../PageLayout';
import Page from './Page';
import {useGetPage} from 'queries/page';
import {getContainerTags} from 'pages/Container/constants';

function PageEventsTab({tabProps: {title}, pageId, children}) {
  const {data: page, status, isFetching, isError, error} = useGetPage(pageId);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pageTags = getContainerTags(); //useGetPageTags();

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
      isError={isError}
      loading={isLoading}
    >
      <Row>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>{error}</div>
        ) : !hasPage ? (
          <h4 className="text-center">No data. Please add new page</h4>
        ) : (
          <>
            <Col sm="12" md="7">
              <Page pageTags={pageTags} page={page} />
            </Col>
            <Col sm="12" md="5">
              {children}
            </Col>
          </>
        )}
      </Row>
    </PageLayout>
  );
}

export default React.memo(PageEventsTab);
