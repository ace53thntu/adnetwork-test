import React, {useCallback, useMemo, useState} from 'react';
import {Button, Card, CardBody, CardTitle, CardHeader, Modal} from 'reactstrap';

// component
import CreateEvent from './CreateEvent';
import UpdateEvent from './UpdateEvent';

// hooks
import {EVENT_TYPES_VALUE} from 'pages/Container/constants';
// import {useContainerStore} from 'pages/Container/context';
// import {getRole} from 'core/utils/auth';
// import {SYS_ADMIN} from 'core/constants/roles';
import DialogConfirm from 'components/common/DialogConfirm';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import Table, {TableStatusCell} from 'components/table';
import {useGetInventoriesByContainer} from 'queries/inventory/useGetInventoriesByContainer';
import {useParams} from 'react-router-dom';
import useGetInventories from 'pages/Container/hooks/useGetInventories';

function Events({pageId}) {
  // const userRole = getRole();
  const isSysAdmin = true; //userRole === SYS_ADMIN;
  const {cid: containerId} = useParams();
  // const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState(5);

  const {data: pages} = useGetInventoriesByContainer({containerId, pageId});
  console.log('🚀 ~ file: Events.js ~ line 27 ~ Events ~ pages', pages);
  const inventories = useGetInventories({pages: pages?.pages, pageId});
  console.log(
    '🚀 ~ file: Events.js ~ line 30 ~ Events ~ inventories',
    inventories
  );

  const deleteEvent = useCallback(() => {
    return new Promise();
  }, []);
  // const {unlockTree} = useContainerStore();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [eventId, setEventId] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const isMobile = tag === 'android-tag' || tag === 'ios-tag';

  // useEffect(() => {
  //   if (!isFetching) {
  //     unlockTree();
  //   }
  // }, [isFetching, unlockTree]);

  const onHandleAddEvent = ev => {
    setIsOpen(true);
  };

  const onHandleClickRow = row => {
    setEventId(row.original.id);
    setIsOpenUpdate(true);
  };

  const handleDeleteEvent = useCallback(async () => {
    setIsLoading(true);
    try {
      await deleteEvent({eventId});
      ShowToast.success('Delete event successfully!', {
        closeOnClick: true
      });
      setOpenConfirm(false);
    } catch (error) {
      ShowToast.error(error, {
        closeOnClick: true
      });
    } finally {
      setIsLoading(false);
    }
  }, [deleteEvent, eventId]);

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
                  setEventId(row.value.id);
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
        <CreateEvent isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
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
        <UpdateEvent
          toggle={() => {
            setIsOpenUpdate(!isOpenUpdate);
          }}
          eventId={eventId}
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

export default Events;
