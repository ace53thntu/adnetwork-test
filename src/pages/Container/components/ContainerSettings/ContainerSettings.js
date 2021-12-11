// import PropTypes from 'prop-types';
import {ContainerAPIRequest} from 'api/container.api';
import {PublisherAPIRequest} from 'api/publisher.api';
import * as React from 'react';
import {useParams} from 'react-router';
import ContainerInfoForm from './ContainerInfoForm';

// import ContainerInfoForm from './ContainerInfoForm';

function ContainerSettings(props) {
  const {cid: containerId} = useParams();

  // const {cid: containerId} = useParams();
  // console.log(
  //   '🚀 ~ file: ContainerSettings.js ~ line 11 ~ ContainerSettings ~ containerId',
  //   containerId
  // );

  // const {data: container, status} = useGetContainer({
  //   containerId,
  //   enabled: !!containerId
  // });

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

  const [container, setContainer] = React.useState(null);
  const [status, setStatus] = React.useState('');

  React.useEffect(() => {
    async function getContainerDetails() {
      try {
        const {data} = await ContainerAPIRequest.getContainer({
          id: containerId
        });
        const {data: publisher} = await PublisherAPIRequest.getPublisher({
          id: data?.publisher_uuid
        });
        setContainer({...data, publisher});
        setStatus('success');
      } catch (err) {
        setStatus('error');
      }
    }
    if (containerId) {
      getContainerDetails();
    }
  }, [containerId]);

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
