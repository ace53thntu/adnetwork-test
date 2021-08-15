import React, {useEffect, useState, useCallback} from 'react';
import {useParams} from 'react-router-dom';
import {Nav, NavItem, Button, TabContent, TabPane, Container} from 'reactstrap';

import ListImportFiles from './ListImportFiles';
import FormImportFiles from './FormImportFiles';

// import {useFetchImportFiles} from 'core/queries/containers';
// import {useGetAContainer} from 'core/queries/containers';
import {PageTitleAlt} from 'components/layouts/Admin/components';

function ContainerImportOffline() {
  const {cid: containerId} = useParams();

  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dataListImportFiles, setCurrentDataFiles] = useState(null);
  const [containerDetail, setCurrentContainer] = useState(null);
  const [updateItem, setUpdateItem] = useState(null);

  // const [fetchImportFiles] = useFetchImportFiles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchImportFiles = new Promise(resolve => resolve([]));
  // const [getAContainer] = useGetAContainer();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAContainer = new Promise(resolve => resolve(null));

  useEffect(() => {
    async function fetchData() {
      const dataListImportFiles = await fetchImportFiles(containerId);
      const {data: containerDetail} = await getAContainer(containerId);

      setCurrentContainer(containerDetail);
      setCurrentDataFiles(dataListImportFiles);
      setLoading(false);
    }

    fetchData();

    return () => {
      setLoading(true);
    };
  }, [getAContainer, fetchImportFiles, containerId]);

  const updateListImport = useCallback(async () => {
    try {
      const dataListImportFiles = await fetchImportFiles(containerId);
      setCurrentDataFiles(dataListImportFiles);
    } catch (error) {}
  }, [fetchImportFiles, containerId]);

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
        heading="Manual Import"
        subheading="Manual Import"
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
              Imported files
            </Button>
          </NavItem>
          <NavItem>
            <Button
              outline
              className={`border-0 btn-transition ${activeTab ? 'active' : ''}`}
              color="primary"
              onClick={() => onEditOrAddItem(null)}
            >
              New files
            </Button>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId={0} className="mt-2">
            <ListImportFiles
              dataListImportFiles={dataListImportFiles}
              containerDetail={containerDetail}
              onEditItem={onEditOrAddItem}
              onNewFileClick={() => onEditOrAddItem(null)}
            />
          </TabPane>
          <TabPane tabId={1} className="mt-2">
            {activeTab === 1 ? (
              <FormImportFiles
                updateListImport={updateListImport}
                updateItem={updateItem}
                setActiveTab={() => setActiveTab(0)}
                dataListImportFiles={dataListImportFiles?.data ?? []}
              />
            ) : null}
          </TabPane>
        </TabContent>
      </Container>
    </>
  );
}

export default ContainerImportOffline;
