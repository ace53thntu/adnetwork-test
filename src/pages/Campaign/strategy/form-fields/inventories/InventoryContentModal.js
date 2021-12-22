/**
 * Copyright (c) 2021-present, AiCactus, Inc.
 * All rights reserved.
 *
 * @flow
 */

//---> Build-in Modules
import React from 'react';

//---> External Modules
import {Badge, Button} from 'reactstrap';
import PropTypes from 'prop-types';

//---> Internal Modules
import {LoadingIndicator} from 'components/common';
import {List} from 'components/list';
import NoDataAvailable from 'components/list/no-data';

import {useGetInventoriesInfinity} from 'queries/inventory';
import {DEFAULT_PAGINATION} from 'constants/misc';
import {Pagination} from 'components/list/pagination';
import {
  getInventoryMarketTypeColor,
  getInventoryTypeColor
} from 'pages/inventory-market/helpers';
import DealFloorPriceInput from './DealFloorPriceInput';
import {
  setStrategyInventoryListRedux,
  useStrategyInventorySelector
} from 'store/reducers/campaign';
import {useDispatch} from 'react-redux';
import {useStrategyInventories} from 'pages/Campaign/hooks/useStrategyInventories';

const propTypes = {
  containerId: PropTypes.string
};

const InventoryContentModal = ({containerId}) => {
  const dispatch = useDispatch();
  const strategyInventories = useStrategyInventorySelector();
  console.log(
    '🚀 ~ file: InventoryContentModal.js ~ line 40 ~ InventoryContentModal ~ strategyInventories',
    strategyInventories
  );
  let params = {
    limit: DEFAULT_PAGINATION.perPage
  };

  if (containerId) {
    params.container_uuid = containerId;
  }

  const {
    data: {pages = []} = {},
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useGetInventoriesInfinity({params, enabled: true});
  const inventories = React.useMemo(() => {
    return pages?.reduce((acc, page) => {
      const {items = []} = page;
      const itemsDestructure = items?.map(item => ({...item, id: item?.uuid}));

      return [...acc, ...itemsDestructure];
    }, []);
  }, [pages]);
  const inventoriesMapping = useStrategyInventories({
    inventories,
    strategyInventories
  });

  const onClickAddInventory = React.useCallback(
    (evt, _inventory) => {
      evt.preventDefault();
      evt.stopPropagation();

      let tmpArr = [...strategyInventories];
      const inventoryFound = tmpArr?.find(
        item => item?.uuid === _inventory?.uuid
      );
      if (!inventoryFound) {
        tmpArr.push(_inventory);
      } else {
        tmpArr = tmpArr.filter(item => item?.uuid !== _inventory?.uuid);
      }
      dispatch(setStrategyInventoryListRedux(tmpArr));
    },
    [dispatch, strategyInventories]
  );

  const onChangeDealFloorPrice = React.useCallback(
    (value, _inventoryId) => {
      let tmpArr = [...strategyInventories];
      tmpArr = tmpArr.map(item => {
        if (item?.uuid === _inventoryId) {
          return {...item, deal_floor_price: value};
        }
        return item;
      });
      dispatch(setStrategyInventoryListRedux(tmpArr));
    },
    [dispatch, strategyInventories]
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
          <DealFloorPriceInput
            defaultValue={row?.value || 0}
            onChangeInputGlobal={value =>
              onChangeDealFloorPrice(value, row?.original?.uuid)
            }
          />
        )
      },
      {
        header: 'Actions',
        accessor: 'action',
        cell: row => {
          const isAdded = row?.original?.is_added || false;
          return (
            <Button
              className="mb-2 mr-2 btn-icon btn-icon-only btn-shadow btn-dashed"
              outline
              color={isAdded ? 'danger' : 'primary'}
              type="button"
              onClick={evt => onClickAddInventory(evt, row?.original)}
            >
              <i
                className={`${
                  isAdded ? 'pe-7s-less' : 'pe-7s-plus'
                } btn-icon-wrapper`}
              ></i>
            </Button>
          );
        }
      }
    ];
  }, [onChangeDealFloorPrice, onClickAddInventory]);

  //---> Define local states.

  const onClickItem = item => {};

  const onClickView = currentItem => {};

  const onClickAction = (actionIndex, currentItem) => {
    if (actionIndex === 0) {
      onClickView(currentItem);
      return;
    }
  };

  return (
    <React.Fragment>
      {isFetching && <LoadingIndicator />}
      {inventories?.length > 0 ? (
        <>
          <List
            showAction={false}
            data={inventoriesMapping}
            columns={columns}
            handleClickItem={onClickItem}
            handleAction={(actionIndex, currentItem) =>
              onClickAction(actionIndex, currentItem)
            }
            isShowInventoryHighlight={false}
          />
          {hasNextPage && (
            <Pagination
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          )}
        </>
      ) : (
        <NoDataAvailable />
      )}
    </React.Fragment>
  );
};

InventoryContentModal.propTypes = propTypes;

export default InventoryContentModal;
