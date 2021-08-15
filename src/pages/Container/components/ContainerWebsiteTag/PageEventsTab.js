import React, {useMemo} from 'react';
import {Row, Col} from 'reactstrap';

// components
import PageLayout from '../PageLayout';
import Page from './Page';
import Events from './Events';

// queries, mutations
// import {useGetPageTypes, useGetPageTags} from 'core/queries/containers';

import {useGetPage} from '../../hooks/usePages';

function PageEventsTab({tabProps: {title}, pageId}) {
  const {data: page, status, isFetching, isError, error} = useGetPage({
    pageId
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pageTypes = []; //useGetPageTypes();
  const pageTags = []; //useGetPageTags();

  const newPageTypes = useMemo(() => {
    return pageTypes?.map(item => ({
      id: item,
      name: item
    }));
  }, [pageTypes]);

  // because API response data has tag is null
  const filteredTags = pageTags.filter(tag => tag?.tag);

  const hasPage = !!page;

  const isLoading = status === 'loading' || isFetching;

  return (
    <PageLayout
      title={title}
      hasPage={hasPage}
      pageTypes={newPageTypes}
      pageTags={filteredTags}
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
              <Page
                pageTypes={newPageTypes}
                pageTags={filteredTags}
                page={page}
              />
            </Col>
            <Col sm="12" md="5">
              <Events pageId={pageId} />
            </Col>
          </>
        )}
      </Row>
    </PageLayout>
  );
}

export default React.memo(PageEventsTab);
