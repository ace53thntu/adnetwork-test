//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import {Badge} from 'reactstrap';
import {useQueryClient} from 'react-query';
import {formatValue} from 'react-currency-input-field';

//---> Internal Modules
import {List} from 'components/list';
import {useGetInventoryDeals} from 'queries/inventory';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {getResponseData} from 'utils/helpers/misc.helpers';
import {CustomStatus} from 'components/list/status';
import {capitalize} from 'utils/helpers/string.helpers';
import NoDataAvailable from 'components/list/no-data';
import {useDeleteDeal} from 'queries/deal';
import DealFormModal from '../deal-form-modal';
import {DialogConfirm} from 'components/common';
import {GET_INVENTORY_DEAL} from 'queries/inventory/constants';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import * as HandleCurrencyFields from 'utils/handleCurrencyFields';

const ActionIndex = {
  EDIT: 0,
  DELETE: 1
};

const propTypes = {
  inventoryId: PropTypes.string.isRequired
};

const DealList = ({inventoryId}) => {
  const client = useQueryClient();

  const columns = useColumns();
  const {mutateAsync: deleteDeal} = useDeleteDeal();
  const {data} = useGetInventoryDeals({
    params: {
      per_page: DEFAULT_PAGINATION.perPage,
      inventory_uuid: inventoryId,
      sort: 'updated_at DESC'
    },
    enabled: !!inventoryId
  });

  const deals = React.useMemo(() => {
    const dealResp = getResponseData(data, IS_RESPONSE_ALL);
    return dealResp?.map(item => ({...item, id: item?.uuid}));
  }, [data]);

  // Local states
  const [activedDeal, setActivedDeal] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  function toggleModal() {
    setOpenModal(prevState => !prevState);
  }

  function onHandleClickRow(currentItem) {
    setActivedDeal(currentItem);
    setOpenModal(true);
  }

  function onClickAction(actionIndex, currentItem) {
    setActivedDeal(currentItem);
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
      await deleteDeal({dealId: activedDeal?.uuid});
      await client.invalidateQueries([GET_INVENTORY_DEAL, inventoryId]);

      ShowToast.success('Deleted deal successfully');
    } catch (error) {
      ShowToast.error(error?.msg || 'Fail to delete deal');
    } finally {
      setIsDeleting(false);
      setOpenDialog(false);
    }
  }

  return (
    <>
      {openModal && (
        <DealFormModal
          modal={openModal}
          toggle={toggleModal}
          dealId={activedDeal?.uuid}
          inventoryId={inventoryId}
        />
      )}
      {deals?.length > 0 ? (
        <div className="scroll-area-lg" style={{height: 330}}>
          <PerfectScrollbar>
            <List
              showAction
              data={deals || []}
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
      {openDialog && (
        <DialogConfirm
          open={openDialog}
          title="Are you sure delete this Bid"
          handleClose={onCancelDelete}
          handleAgree={onSubmitDelete}
          isLoading={isDeleting}
        />
      )}
    </>
  );
};

DealList.propTypes = propTypes;

export default DealList;

const useColumns = () => {
  return React.useMemo(() => {
    return [
      {
        header: 'DSP',
        accessor: 'dsp_name'
      },
      {
        header: 'Deal price',
        accessor: 'deal_price',
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
      },
      {
        header: 'Limit impression',
        accessor: 'limit_impression',
        cell: row => row?.value?.toString() || ''
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
        header: 'Header dealding',
        accessor: 'header_dealding',
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
                statusProps.color = 'secondary';
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
