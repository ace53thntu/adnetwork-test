import React from 'react';
import {Row, Col} from 'reactstrap';

// components
import PageLayout from '../PageLayout';

// queries, mutations
// import {useGetPageTypes, useGetPageTags} from 'core/queries/containers';

function EmptyPage({tabProps: {title}}) {
  // const pageTypes = useGetPageTypes();
  // const pageTags = useGetPageTags();
  const pageTypes = [];
  const pageTags = [];
  // because API response data has tag is null
  const filteredTags = pageTags.filter(tag => tag?.tag);

  const hasPage = false;

  return (
    <PageLayout
      isIOS
      title={title}
      hasPage={hasPage}
      pageTypes={pageTypes}
      pageTags={filteredTags}
    >
      <Row>
        <Col sm="12" md="7">
          <h4 className="text-center">No data. Please add new page</h4>
        </Col>
      </Row>
    </PageLayout>
  );
}

export default React.memo(EmptyPage);
