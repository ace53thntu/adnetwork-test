// Build-in Modules
import React from 'react';

// External Modules
import {Badge} from 'reactstrap';
import {useFormContext} from 'react-hook-form';

// Internal Modules
import {useStrategyInventorySelector} from 'store/reducers/campaign';
import {List} from 'components/list';

const StrategyInventory = () => {
  const {register} = useFormContext();
  const strategyInventories = useStrategyInventorySelector();

  const columns = React.useMemo(() => {
    return [
      {
        header: 'Name',
        accessor: 'name'
      },
      {
        header: 'Container name',
        accessor: 'container_name'
      },
      {
        header: 'Position',
        accessor: 'position_name'
      },
      {
        header: 'Deal Floor Price',
        accessor: 'deal_floor_price',
        cell: row => (
          <Badge color="light" pill>
            {row?.value}
          </Badge>
        )
      }
    ];
  }, []);

  function onClickAction(actionIndex, currentItem) {
    console.log(
      '🚀 ~ file: StrategyInventory.js ~ line 80 ~ onClickAction ~ currentItem',
      currentItem
    );
  }

  return (
    <>
      <List
        showAction
        data={strategyInventories}
        columns={columns}
        actions={['Delete']}
        handleAction={(actionIndex, currentItem) =>
          onClickAction(actionIndex, currentItem)
        }
      />
      {strategyInventories?.map((inventoryItem, inventoryIndex) => {
        return (
          <input
            key={`pr-${inventoryItem?.uuid}`}
            type="hidden"
            name={`inventories_bid[${inventoryIndex}].uuid`}
            value={inventoryItem?.uuid}
            ref={register()}
          />
        );
      })}
    </>
  );
};

export default StrategyInventory;
