//---> Build-in Modules
import React from 'react';

//---> External Modules
import moment from 'moment';

//---> Internal Modules
import {List} from 'components/list';
import {capitalize} from 'utils/helpers/string.helpers';
import {useGetInventoriesByContainer} from 'queries/inventory/useGetInventoriesByContainer';
import Status from 'components/list/status';
import {LoadingIndicator} from 'components/common';
import {useInventoriesByContainer} from '../hooks';
import NoDataAvailable from 'components/list/no-data';
import {Badge} from 'reactstrap';

const InventoryContainer = ({data}) => {
  const {data: containerInventories, isLoading} = useGetInventoriesByContainer({
    containerId: data?.container_uuid,
    pageId: data?.uuid
  });
  console.log('-containerInventories', containerInventories);
  const inventories = useInventoriesByContainer({
    data: containerInventories,
    pageId: data?.uuid
  });
  console.log(
    '🚀 ~ file: container-inventory.js ~ line 21 ~ InventoryContainer ~ inventories',
    inventories
  );
  const columns = React.useMemo(() => {
    return [
      {
        header: 'Name',
        accessor: 'name'
      },
      {
        header: 'Type',
        accessor: 'type',
        cell: row => <Badge color="primary">{row?.value}</Badge>
      },
      {
        header: 'Minimum Price',
        accessor: 'minimum_price',
        cell: row => (
          <Badge color="light" pill>
            {row?.value}
          </Badge>
        )
      },
      {
        header: 'Fill Rate',
        accessor: 'fill_rate',
        cell: row => (
          <Badge color="light" pill>
            {row?.value}
          </Badge>
        )
      },
      {
        header: 'Click Rate',
        accessor: 'click_rate',
        cell: row => (
          <Badge color="light" pill>
            {row?.value}
          </Badge>
        )
      },
      {
        accessor: 'status',
        cell: row => {
          if (row.value) {
            let statusProps = {
              label: capitalize(row.value)
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
            return <Status {...statusProps} noHeader />;
          } else {
            return null;
          }
        }
      },
      {
        header: 'Created at',
        accessor: 'created_at',
        cell: row => {
          if (row.value) {
            return row.value ? moment(row.value).format('DD/MM/YYYY') : null;
          } else {
            return null;
          }
        }
      }
    ];
  }, []);

  return (
    <React.Fragment>
      {isLoading && <LoadingIndicator />}
      {inventories?.length > 0 ? (
        <List
          data={inventories}
          columns={columns}
          // handleClickItem={item =>
          //   handleClickSourceItem({
          //     containerId: data.id,
          //     sourceItem: item
          //   })
          // }
        />
      ) : (
        <NoDataAvailable />
      )}
    </React.Fragment>
  );
};

export default InventoryContainer;
