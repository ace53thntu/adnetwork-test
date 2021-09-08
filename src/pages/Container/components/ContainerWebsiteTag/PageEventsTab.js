import React, {useMemo} from 'react';
import {Row, Col} from 'reactstrap';

// components
import PageLayout from '../PageLayout';
import Page from './Page';
import Inventories from './Inventories';
import {useGetPage} from 'queries/page';
import {getContainerTags} from 'pages/Container/constants';

// queries, mutations
// import {useGetPageTypes, useGetPageTags} from 'core/queries/containers';

function PageEventsTab({tabProps: {title}, pageId}) {
  const {data: page, status, isFetching, isError, error} = useGetPage(pageId);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pageTypes = []; //useGetPageTypes();
  const pageTags = getContainerTags(); //useGetPageTags();

  const newPageTypes = useMemo(() => {
    return pageTypes?.map(item => ({
      id: item,
      name: item
    }));
  }, [pageTypes]);

  const hasPage = !!page;

  const isLoading = status === 'loading' || isFetching;

  return (
    <PageLayout
      title={title}
      hasPage={hasPage}
      pageTypes={newPageTypes}
      pageTags={pageTags}
      pageName={page?.name}
      pageId={page?.id}
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
              <Page pageTypes={newPageTypes} pageTags={pageTags} page={page} />
            </Col>
            <Col sm="12" md="5">
              <Inventories pageId={pageId} />
            </Col>
          </>
        )}
      </Row>
    </PageLayout>
  );
}

export default React.memo(PageEventsTab);
