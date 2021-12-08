//---> Byild0in Modules
import React, {useCallback, useMemo, useState} from 'react';

//---> External Modules
import {Button, Card, CardBody, CardTitle, CardHeader, Modal} from 'reactstrap';

//---> Internal Modules
import {EVENT_TYPES_VALUE} from 'pages/Container/constants';
import DialogConfirm from 'components/common/DialogConfirm';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import Table, {TableStatusCell} from 'components/table';
import {useDeleteInventory} from 'queries/inventory';
import CreateInventory from './CreateInventory';
import UpdateInventory from './UpdateInventory';

function Inventories({pageId, inventories = []}) {
  const isSysAdmin = true; //userRole === SYS_ADMIN;

  const {mutateAsync: deleteInventory} = useDeleteInventory();
  // const {unlockTree} = useContainerStore();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [inventoryId, setInventoryId] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onHandleAddEvent = ev => {
    setIsOpen(true);
  };

  const onHandleClickRow = row => {
    setInventoryId(row.original.uuid);
    setIsOpenUpdate(true);
  };

  const handleDeleteEvent = useCallback(async () => {
    setIsLoading(true);
    try {
      await deleteInventory({inventoryId});
      ShowToast.success('Deleted Inventory successfully!', {
        closeOnClick: true
      });
      setOpenConfirm(false);
    } catch (error) {
      ShowToast.error(error || 'Fail to delete Inventory', {
        closeOnClick: true
      });
    } finally {
      setIsLoading(false);
    }
  }, [deleteInventory, inventoryId]);

  const columns = useMemo(
    () => [
      {
        Header: 'Type',
        accessor: 'type'
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: row => {
          return <span>{row.value}</span>;
        }
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: row => {
          return <TableStatusCell row={row} />;
        }
      },
      {
        Header: '',
        accessor: '',
        Cell: row => {
          return (
            <div
              className="d-block text-center"
              style={{
                margin: '0 auto'
              }}
            >
              <Button
                size="small"
                color="danger"
                onClick={evt => {
                  evt.stopPropagation();
                  setOpenConfirm(true);
                  setInventoryId(row.value.uuid);
                }}
                className="btn-icon btn-icon-only"
                disabled={
                  !isSysAdmin && row?.original?.type === EVENT_TYPES_VALUE.page
                }
              >
                <i className="pe-7s-trash btn-icon-wrapper"> </i>
              </Button>
            </div>
          );
        }
      }
    ],
    [isSysAdmin]
  );

  // const scrollToTop = () => {
  //   window.scrollTo(0, 0);
  // };

  // const totalPage =
  //   events && events?.total ? Math.ceil(events.total / pageSize) : 1;

  return (
    <Card className="main-card mb-3">
      <CardHeader className="border-0">
        <CardTitle>Inventories</CardTitle>
        <div className="btn-actions-pane-right">
          <Button
            color="primary"
            className="btn-icon"
            onClick={onHandleAddEvent}
          >
            <i className="pe-7s-plus btn-icon-wrapper"> </i>
            Add Inventory
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <Table
          data={inventories}
          columns={columns}
          cursor
          getTrProps={(state, rowInfo) => ({
            onClick: () => {
              onHandleClickRow(rowInfo);
            }
          })}
          sortable={false}
          resizable={false}
          filterable={false}
          // loading={isFetching}
          className="-striped -highlight"
          pages={1}
          // pageSize={pageSize}
          manual
          // onFetchData={(state, instance) => {
          //   setPage(state.page + 1);
          //   setPageSize(state.pageSize);
          //   scrollToTop();
          // }}
        />
      </CardBody>

      {isOpen && (
        <CreateInventory isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
      )}

      <Modal
        unmountOnClose
        size="lg"
        className="modal-dialog shadow-none"
        isOpen={isOpenUpdate}
        toggle={() => {
          setIsOpenUpdate(!isOpenUpdate);
        }}
      >
        <UpdateInventory
          toggle={() => {
            setIsOpenUpdate(!isOpenUpdate);
          }}
          inventoryId={inventoryId}
          pageId={pageId}
        />
      </Modal>

      <DialogConfirm
        disableBackdropClick
        disableEscapeKeyDown
        isLoading={isLoading}
        open={openConfirm}
        handleClose={() => setOpenConfirm(false)}
        handleAgree={handleDeleteEvent}
      />
    </Card>
  );
}

export default Inventories;
