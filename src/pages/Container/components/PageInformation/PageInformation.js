// import PropTypes from 'prop-types';
import {getContainerTags} from 'pages/Container/constants';
import {useGetPage, useGetPagesByContainer} from 'queries/page';
import * as React from 'react';
import {useParams} from 'react-router';

import PageInformationForm from './PageInformationForm';

function PageInformation(props) {
  const {pageId, containerId} = useParams();

  const {
    data: pageRes,
    isFetching: isFetchingGetPage,
    isError: isErrorGetPage
  } = useGetPage(pageId);

  const {
    data: pages,
    isFetching: isFetchingGetPages,
    isError: isErrorGetPages
  } = useGetPagesByContainer(containerId);

  if (isFetchingGetPage || isFetchingGetPages) {
    return <div>Loading...</div>;
  }

  if (isErrorGetPage || isErrorGetPages) {
    return <div>Something went wrong.</div>;
  }

  return (
    <PageInformationForm
      rawData={pageRes}
      pageTags={getContainerTags()}
      pages={pages}
    />
  );
}

PageInformation.propTypes = {};
PageInformation.defaultProps = {};

export default PageInformation;
