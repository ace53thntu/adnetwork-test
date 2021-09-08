//---> Build-in Modules
import React, {useState} from 'react';

//---> External Modules
import {Badge} from 'reactstrap';

//---> Internal Modules
import {capitalize} from 'utils/helpers/string.helpers';
import {LoadingIndicator} from 'components/common';
import {List} from 'components/list';
import NoDataAvailable from 'components/list/no-data';
import {useGetInventoriesByContainer} from 'queries/inventory/useGetInventoriesByContainer';
import Status from 'components/list/status';
import {useInventoriesByContainer} from '../hooks';
import {InventoryDetails} from '.';
import {getInventoryTypeColor} from '../helpers';
import {useGetPositions} from 'queries/position';

const InventoryContainer = ({page}) => {
  const {data: positions = []} = useGetPositions();
  console.log(
    '🚀 ~ file: container-inventory.js ~ line 21 ~ InventoryContainer ~ positions',
    positions
  );

  const {data: containerInventories, isLoading} = useGetInventoriesByContainer({
    containerId: page?.container_uuid,
    pageId: page?.uuid
  });
  const inventories = useInventoriesByContainer({
    data: containerInventories,
    page,
    positions
  });

  const columns = React.useMemo(() => {
    return [
      {
        header: 'Name',
        accessor: 'name'
      },
      {
        header: 'Page Name',
        accessor: 'page_name'
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
        header: 'Minimum Price',
        accessor: 'minimum_price',
        cell: row => (
          <Badge color="warning" pill>
            {row?.value}
          </Badge>
        )
      },
      {
        header: 'Fill Rate',
        accessor: 'fill_rate',
        cell: row => (
          <Badge color="info" pill>
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
      }
    ];
  }, []);

  //---> Define local states.
  const [openModal, setOpenModal] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);

  const onToggleModal = () => {
    setOpenModal(prevState => !prevState);
  };

  const onClickItem = item => {
    setOpenModal(true);
    setSelectedInventory(item);
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingIndicator />}
      {inventories?.length > 0 ? (
        <List
          showAction
          data={inventories}
          columns={columns}
          actions={['View', 'Bid', 'Deal']}
          handleClickItem={onClickItem}
        />
      ) : (
        <NoDataAvailable />
      )}
      {openModal && (
        <InventoryDetails
          modal={openModal}
          toggle={onToggleModal}
          inventoryData={selectedInventory}
        />
      )}
    </React.Fragment>
  );
};

export default InventoryContainer;
