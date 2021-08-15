import React, {useMemo} from 'react';
import {Row, Col} from 'reactstrap';
// import { useParams } from 'react-router-dom';

// components
import PageLayout from '../PageLayout';
import Screen from './Screen';
import Events from '../ContainerWebsiteTag/Events';

// queries, mutations
// import {useGetPageTypes, useGetPageTags} from 'core/queries/containers';

import {useGetPage} from '../../hooks/usePages';

function ScreensAndEvents({tabProps: {title}, pageId}) {
  // const {tag} = useParams();
  const {data: page, status, isFetching} = useGetPage({
    pageId
  });
  // const pageTypes = useGetPageTypes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pageTypes = [];
  // const pageTags = useGetPageTags();
  const pageTags = [];

  const pageTypeOpts = useMemo(() => {
    return pageTypes?.map(item => ({
      id: item,
      name: item
    }));
  }, [pageTypes]);

  // because API response data has tag is null
  const filteredTags = pageTags.filter(item => item?.tag);

  const hasPage = !!page;

  const isLoading = status === 'loading' || isFetching;

  return (
    <PageLayout
      title={title}
      hasPage={hasPage}
      pageTypes={pageTypeOpts}
      pageTags={filteredTags}
      pageName={page?.name}
      pageId={page?.id}
      source={page?.source}
      isIOS
    >
      <Row>
        <Col sm="12" md="7">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <Screen
              pageTypes={pageTypeOpts}
              pageTags={filteredTags}
              page={page}
            />
          )}
        </Col>
        <Col sm="12" md="5">
          {isLoading ? <div>Loading...</div> : <Events isIOS pageId={pageId} />}
        </Col>
      </Row>
    </PageLayout>
  );
}

export default React.memo(ScreensAndEvents);
