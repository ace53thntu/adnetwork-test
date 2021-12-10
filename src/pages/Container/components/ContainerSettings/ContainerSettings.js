// import PropTypes from 'prop-types';
import {useGetContainer} from 'queries/container';
import * as React from 'react';
import {useParams} from 'react-router';

import ContainerInfoForm from './ContainerInfoForm';

function ContainerSettings(props) {
  // const {containerId, source, pageId} = useParams();
  const {cid: containerId} = useParams();

  const {data: container, status} = useGetContainer({
    containerId,
    enabled: !!containerId
  });

  // const {data: pages = []} = useGetPages({
  //   containerId,
  //   source,
  //   enabled: !!container
  // });
  // const {data: events = []} = useG({
  //   pageId,
  //   enabled: !!pages,
  //   page: 1,
  //   perPage: 10000
  // });
  // const {data: containers = [], status} = useContainers({
  //   enabled: !!events,
  //   suspense: false,
  //   partnerId
  // });

  const pagesCount = 0; //pages?.length ?? 0;
  const eventsCounts = 0; //events?.length ?? 0;
  const filteredContainer = []; //containers?.filter(cnt => cnt.id !== container?.id);

  if (status !== 'success' && status !== 'error') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Something went wrong.</div>;
  }

  return (
    <ContainerInfoForm
      pagesCount={pagesCount}
      eventsCounts={eventsCounts}
      containers={filteredContainer}
      container={container}
    />
  );
}

ContainerSettings.propTypes = {};
ContainerSettings.defaultProps = {};

export default ContainerSettings;
