import React, {useState, useCallback} from 'react';
import {useParams} from 'react-router-dom';
import {Nav, NavItem, Button, TabContent, TabPane, Container} from 'reactstrap';

// components
import ListTransferFiles from './ListTransferFiles';
import FormTransferFiles from './FormTransferFiles';

// import {useGetAContainer, useFetchTransferFiles} from 'core/queries/containers';
import {PageTitleAlt} from 'components/layouts/Admin/components';

function ContainerTransfer() {
  const {cid: containerId} = useParams();

  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dataListTransferFiles, setCurrentDataFiles] = useState({});
  const [containerDetail, setCurrentContainer] = useState(null);
  const [updateItem, setUpdateItem] = useState(null);

  // const [fetchTransferFiles] = useFetchTransferFiles();
  // const [getAContainer] = useGetAContainer();

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const dataListTransferFiles = await fetchTransferFiles(containerId);
  //       setCurrentDataFiles(dataListTransferFiles);
  //     } catch (error) {}
  //     const {data: containerDetail} = await getAContainer(containerId);

  //     setCurrentContainer(containerDetail);
  //     setLoading(false);
  //   }

  //   fetchData();

  //   return () => {
  //     setLoading(true);
  //   };
  // }, [getAContainer, fetchTransferFiles, containerId]);

  const updateListTransfer = useCallback(async () => {
    try {
      // const dataListTransferFiles = await fetchTransferFiles(containerId);
      // setCurrentDataFiles(dataListTransferFiles);
    } catch (error) {}
  }, []);

  const onEditOrAddItem = useCallback(
    async item => {
      setUpdateItem(item);
      setActiveTab(1);
    },
    [setUpdateItem, setActiveTab]
  );

  return loading ? (
    <div>Loading...</div>
  ) : (
    <>
      <PageTitleAlt
        heading="Schedule Transfer"
        subheading="Schedule Transfer"
        icon="pe-7s-plane icon-gradient bg-tempting-azure"
      />
      <Container fluid>
        <Nav className="justify-content-center">
          <NavItem>
            <Button
              outline
              className={`border-0 btn-transition mr-2 ${
                !activeTab ? 'active' : ''
              }`}
              color="primary"
              onClick={() => setActiveTab(0)}
            >
              Scheduled transfer
            </Button>
          </NavItem>
          <NavItem>
            <Button
              outline
              className={`border-0 btn-transition ${activeTab ? 'active' : ''}`}
              color="primary"
              onClick={() => onEditOrAddItem(null)}
            >
              New transfer
            </Button>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId={0} className="mt-2">
            <ListTransferFiles
              container={containerDetail}
              dataListTransferFiles={dataListTransferFiles}
              onEditItem={onEditOrAddItem}
              onNewTransferClick={() => onEditOrAddItem(null)}
            />
          </TabPane>
          <TabPane tabId={1} className="mt-2">
            {activeTab === 1 ? (
              <FormTransferFiles
                updateListTransfer={updateListTransfer}
                updateItem={updateItem}
                setActiveTab={() => setActiveTab(0)}
              />
            ) : null}
          </TabPane>
        </TabContent>
      </Container>
    </>
  );
}

export default ContainerTransfer;
