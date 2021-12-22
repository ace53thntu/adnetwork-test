import React from 'react';

import {Badge} from 'reactstrap';

import {useStrategyInventorySelector} from 'store/reducers/campaign';
import {List} from 'components/list';
import {
  getInventoryMarketTypeColor,
  getInventoryTypeColor
} from 'pages/inventory-market/helpers';

const StrategyInventory = () => {
  const strategyInventories = useStrategyInventorySelector();

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
    </>
  );
};

export default StrategyInventory;
