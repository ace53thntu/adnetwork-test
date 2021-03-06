//---> Build-in Modules
import React, {useCallback, useState} from 'react';

//---> External Modules
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Badge,
  Modal
} from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {formatValue} from 'react-currency-input-field';
import {useParams} from 'react-router';

//---> Internal Modules
import DialogConfirm from 'components/common/DialogConfirm';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {useDeleteInventory, useGetInventoriesInfinity} from 'queries/inventory';
import CreateInventory from './CreateInventory';
import UpdateInventory from './UpdateInventory';
import {List} from 'components/list';
import {
  getInventoryMarketTypeColor,
  getInventoryTypeColor
} from 'pages/inventory-market/helpers';
import {Pagination} from 'components/list/pagination';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {ApiError, LoadingIndicator} from 'components/common';
import NoDataAvailable from 'components/list/no-data';
import {getResponseData} from 'utils/helpers/misc.helpers';
import * as HandleCurrencyFields from 'utils/handleCurrencyFields';

const ActionIndexes = {
  EDIT: 0,
  DELETE: 1
};

const propTypes = {};

function InventoryList() {
  const {pageId} = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [inventoryId, setInventoryId] = useState('');

  const [openConfirm, setOpenConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = {
    per_page: DEFAULT_PAGINATION.perPage,
    page_uuid: pageId,
    sort: 'created_at DESC'
  };

  const {
    data: {pages = []} = {},
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useGetInventoriesInfinity({
    params,
    enabled: !!pageId
  });
  const {mutateAsync: deleteInventory} = useDeleteInventory({
    pageId,
    queryKeyParam: params
  });

  const containerInventories = React.useMemo(() => {
    return pages?.reduce((acc, page) => {
      const items = getResponseData(page, IS_RESPONSE_ALL);
      const itemsDestructure = items?.map(item => ({...item, id: item?.uuid}));
      return [...acc, ...itemsDestructure];
    }, []);
  }, [pages]);

  const columns = React.useMemo(() => {
    return [
      {
        header: 'Name',
        accessor: 'name'
      },
      {
        header: 'Type',
        accessor: 'type',
        cell: row => (
          <Badge color={getInventoryTypeColor({type: row?.value})}>
            {row?.value}
          </Badge>
        )
      },
      {
        header: 'Market Type',
        accessor: 'market_type',
        cell: row => (
          <Badge color={getInventoryMarketTypeColor({type: row?.value})}>
            {row?.value}
          </Badge>
        )
      },
      {
        header: 'Floor price',
        accessor: 'floor_price',
        cell: row => (
          <Badge color="info" pill>
            {row?.value
              ? formatValue({
                  value: HandleCurrencyFields.convertApiToGui({
                    value: row?.value
                  })?.toString(),
                  groupSeparator: ',',
                  decimalSeparator: '.',
                  prefix: '$'
                })
              : ''}
          </Badge>
        )
      }
    ];
  }, []);

  const onHandleAddEvent = ev => {
    setIsOpen(true);
  };

  const onHandleClickRow = row => {
    setInventoryId(row?.uuid);
    setIsOpenUpdate(true);
  };

  function onClickAction(actionIndex, currentItem) {
    if (actionIndex === ActionIndexes.EDIT) {
      setIsOpenUpdate(true);
      setInventoryId(currentItem?.uuid);
      return;
    }

    if (actionIndex === ActionIndexes.DELETE) {
      setInventoryId(currentItem?.uuid);
      setOpenConfirm(true);
    }
  }

  const handleDeleteEvent = useCallback(async () => {
    setIsLoading(true);
    try {
      await deleteInventory({inventoryId});
      ShowToast.success('Deleted Inventory successfully!', {
        closeOnClick: true
      });
      setOpenConfirm(false);
    } catch (error) {
      ShowToast.error(
        <ApiError apiError={error || 'Fail to delete Inventory'} />
      );
    } finally {
      setIsLoading(false);
    }
  }, [deleteInventory, inventoryId]);

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
      <div className="scroll-area-lg" style={{height: 430}}>
        <PerfectScrollbar>
          <CardBody>
            {isFetching && <LoadingIndicator />}
            {containerInventories?.length > 0 ? (
              <List
                showAction
                data={containerInventories}
                columns={columns}
                actions={['Edit', 'Delete']}
                handleClickItem={onHandleClickRow}
                handleAction={(actionIndex, currentItem) =>
                  onClickAction(actionIndex, currentItem)
                }
                isShowInventoryHighlight
              />
            ) : (
              <NoDataAvailable message="No Inventory" />
            )}
            {hasNextPage && (
              <Pagination
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={fetchNextPage}
              />
            )}
          </CardBody>
        </PerfectScrollbar>
      </div>
      {isOpen && (
        <CreateInventory isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
      )}

      {isOpenUpdate && (
        <Modal
          unmountOnClose
          size="lg"
          className="modal-dialog shadow-none"
          isOpen={isOpenUpdate}
          style={{maxWidth: 1024}}
        >
          <UpdateInventory
            toggle={() => {
              setIsOpenUpdate(!isOpenUpdate);
            }}
            inventoryId={inventoryId}
            pageId={pageId}
          />
        </Modal>
      )}

      {openConfirm && (
        <DialogConfirm
          disableBackdropClick
          disableEscapeKeyDown
          isLoading={isLoading}
          open={openConfirm}
          handleClose={() => setOpenConfirm(false)}
          handleAgree={handleDeleteEvent}
        />
      )}
    </Card>
  );
}

InventoryList.propTypes = propTypes;

export default InventoryList;
