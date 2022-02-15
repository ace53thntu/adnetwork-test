// import PropTypes from 'prop-types';
import {ContainerAPIRequest} from 'api/container.api';
import * as React from 'react';
import {useParams} from 'react-router';
import ContainerInfoForm from './ContainerInfoForm';

// import ContainerInfoForm from './ContainerInfoForm';

function ContainerSettings(props) {
  const {cid: containerId} = useParams();

  const [container, setContainer] = React.useState(null);

  const [status, setStatus] = React.useState('');

  React.useEffect(() => {
    async function getContainerDetails() {
      try {
        const {data} = await ContainerAPIRequest.getContainer({
          id: containerId
        });

        setContainer({...data});
        setStatus('success');
      } catch (err) {
        setStatus('error');
      }
    }
    if (containerId) {
      getContainerDetails();
    }
  }, [containerId]);

  const pagesCount = container?.total_pages || 0;
  const inventoriesCounts = container?.pages?.reduce((acc, item) => {
    const {total_inventories = 0} = item;
    acc += total_inventories;
    return acc;
  }, 0);
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
      inventoriesCounts={inventoriesCounts}
      containers={filteredContainer}
      container={container}
    />
  );
}

ContainerSettings.propTypes = {};
ContainerSettings.defaultProps = {};

export default ContainerSettings;
