//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import {Badge} from 'reactstrap';

//---> Internal Modules
import {List} from 'components/list';
import {useGetInventoryBids} from 'queries/inventory';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {getResponseData} from 'utils/helpers/misc.helpers';
import {capitalize} from 'utils/helpers/string.helpers';
import {CustomStatus} from 'components/list/status';
import NoDataAvailable from 'components/list/no-data';
import BidFormModal from '../bid-form-modal';
import {DialogConfirm} from 'components/common';
import {useDeleteBid} from 'queries/bid';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {useQueryClient} from 'react-query';
import {GET_INVENTORY_BID} from 'queries/inventory/constants';

const ActionIndex = {
  EDIT: 0,
  DELETE: 1
};

const propTypes = {
  inventoryId: PropTypes.string.isRequired
};

const BidList = ({inventoryId}) => {
  const client = useQueryClient();

  const columns = useColumns();
  const {mutateAsync: deleteBid} = useDeleteBid();
  const {data} = useGetInventoryBids({
    params: {
      per_page: DEFAULT_PAGINATION.perPage,
      inventory_uuid: inventoryId
    },
    enabled: !!inventoryId
  });

  const bids = React.useMemo(() => {
    const bidResp = getResponseData(data, IS_RESPONSE_ALL);
    return bidResp?.map(item => ({...item, id: item?.uuid}));
  }, [data]);

  // Local states
  const [activedBid, setActivedBid] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  function toggleModal() {
    setOpenModal(prevState => !prevState);
  }

  function onHandleClickRow(currentItem) {
    setActivedBid(currentItem);
    setOpenModal(true);
  }

  function onClickAction(actionIndex, currentItem) {
    setActivedBid(currentItem);
    if (actionIndex === ActionIndex.EDIT) {
      setOpenModal(true);
    }

    if (actionIndex === ActionIndex.DELETE) {
      setOpenDialog(true);
    }
  }

  function onCancelDelete() {
    setOpenDialog(false);
  }

  async function onSubmitDelete() {
    setIsDeleting(true);
    try {
      await deleteBid({bidId: activedBid?.uuid});
      await client.invalidateQueries([GET_INVENTORY_BID, inventoryId]);

      ShowToast.success('Deleted bid successfully');
    } catch (error) {
      ShowToast.error(error?.msg || 'Fail to delete bid');
    } finally {
      setIsDeleting(false);
      setOpenDialog(false);
    }
  }

  return (
    <>
      {openModal && (
        <BidFormModal
          modal={openModal}
          toggle={toggleModal}
          bidId={activedBid?.uuid}
          inventoryId={inventoryId}
        />
      )}
      {bids?.length > 0 ? (
        <div className="scroll-area-lg" style={{height: 330}}>
          <PerfectScrollbar>
            <List
              showAction
              data={bids || []}
              columns={columns}
              actions={['Edit', 'Delete']}
              handleClickItem={onHandleClickRow}
              handleAction={(actionIndex, currentItem) =>
                onClickAction(actionIndex, currentItem)
              }
            />
          </PerfectScrollbar>
        </div>
      ) : (
        <NoDataAvailable />
      )}

      <DialogConfirm
        open={openDialog}
        title="Are you sure delete this Bid"
        handleClose={onCancelDelete}
        handleAgree={onSubmitDelete}
        isLoading={isDeleting}
      />
    </>
  );
};

BidList.propTypes = propTypes;

export default BidList;

const useColumns = () => {
  return React.useMemo(() => {
    return [
      {
        header: 'DSP',
        accessor: 'dsp_name'
      },
      {
        header: 'Start date',
        accessor: 'start_time',
        cell: row => (row?.value ? moment(row?.value).format('DD/MM/YYYY') : '')
      },
      {
        header: 'End date',
        accessor: 'end_time',
        cell: row => (row?.value ? moment(row?.value).format('DD/MM/YYYY') : '')
      },
      {
        header: 'Header bidding',
        accessor: 'header_bidding',
        cell: row => (
          <Badge color={row?.value ? 'primary' : 'warning'} pill>
            {row?.value ? 'true' : 'false'}
          </Badge>
        )
      },
      {
        accessor: 'status',
        cell: row => {
          if (row.value) {
            let statusProps = {
              label: capitalize(row?.value)
            };
            switch (row.value) {
              case 'active':
                statusProps.color = 'success';
                break;
              case 'pending':
                statusProps.color = 'warning';
                break;
              case 'completed':
                statusProps.color = 'info';
                break;
              default:
                statusProps.color = 'error';
                break;
            }
            return <CustomStatus {...statusProps} noHeader />;
          } else {
            return null;
          }
        }
      }
    ];
  }, []);
};
