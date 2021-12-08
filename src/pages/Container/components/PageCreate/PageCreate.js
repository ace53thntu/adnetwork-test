// import PropTypes from 'prop-types';
import {useContainerSelector} from 'store/reducers/container';
import * as React from 'react';
import {useParams} from 'react-router';
import {ModalBody, ModalHeader} from 'reactstrap';

import PageCreateForm from './PageCreateForm';
import {useGetPages} from 'pages/Container/hooks/usePages';
import {getContainerTags} from 'pages/Container/constants';

function PageCreate(props) {
  const {source, containerId} = useParams();
  const {selectedSource} = useContainerSelector();

  const {data: {items: pages = []} = {}, status} = useGetPages({
    containerId,
    source: source || selectedSource
  });

  // because API response data has tag is null
  const isMobile = source
    ? source === 'ios' || source === 'android'
    : selectedSource === 'ios' || selectedSource === 'android';

  if (status !== 'success' && status !== 'error') {
    return (
      <>
        <ModalHeader>{isMobile ? 'Screen' : 'Page'} information</ModalHeader>
        <ModalBody>
          <div>Loading...</div>
        </ModalBody>
      </>
    );
  }

  if (status === 'error') {
    return (
      <>
        <ModalHeader>{isMobile ? 'Screen' : 'Page'} information</ModalHeader>
        <ModalBody>
          <div>Something went wrong.</div>
        </ModalBody>
      </>
    );
  }

  return <PageCreateForm pageTags={getContainerTags()} pages={pages} />;
}

PageCreate.propTypes = {};
PageCreate.defaultProps = {};

export default PageCreate;
