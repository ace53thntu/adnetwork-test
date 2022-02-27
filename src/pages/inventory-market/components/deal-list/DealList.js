//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import {Badge} from 'reactstrap';

//---> Internal Modules
import {List} from 'components/list';
import {useGetInventoryDeals} from 'queries/inventory';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {getResponseData} from 'utils/helpers/misc.helpers';
import {CustomStatus} from 'components/list/status';
import {capitalize} from 'utils/helpers/string.helpers';
import NoDataAvailable from 'components/list/no-data';

const propTypes = {
  inventoryId: PropTypes.string.isRequired
};

const DealList = ({inventoryId}) => {
  const columns = useColumns();
  const {data} = useGetInventoryDeals({
    params: {
      per_page: DEFAULT_PAGINATION.perPage,
      inventory_uuid: inventoryId
    },
    enabled: !!inventoryId
  });

  const deals = React.useMemo(() => {
    const dealResp = getResponseData(data, IS_RESPONSE_ALL);
    return dealResp?.map(item => ({...item, id: item?.uuid}));
  }, [data]);

  function onHandleClickRow() {}

  function onClickAction() {}

  return (
    <>
      {' '}
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
            )
          </PerfectScrollbar>
        </div>
      ) : (
        <NoDataAvailable />
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
        accessor: 'dsp'
      },
      {
        header: 'Deal price',
        accessor: 'deal_price',
        cell: row => row?.value?.toString() || ''
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
