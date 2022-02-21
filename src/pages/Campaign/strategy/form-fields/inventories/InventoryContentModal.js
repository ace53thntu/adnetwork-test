/**
 * Copyright (c) 2021-present, AiCactus, Inc.
 * All rights reserved.
 *
 * @flow
 */

//---> Build-in Modules
import React from 'react';

//---> External Modules
import {Badge} from 'reactstrap';
import PropTypes from 'prop-types';

//---> Internal Modules
import {LoadingIndicator} from 'components/common';
import {List} from 'components/list';
import NoDataAvailable from 'components/list/no-data';

import {useGetInventoriesInfinity} from 'queries/inventory';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {Pagination} from 'components/list/pagination';
import {
  getInventoryMarketTypeColor,
  getInventoryTypeColor
} from 'pages/inventory-market/helpers';
import DealFloorPriceInput from './DealFloorPriceInput';
import {
  setStrategyInventoryTempListRedux,
  useStrategyInventoryTempSelector
} from 'store/reducers/campaign';
import {useDispatch} from 'react-redux';
import {useStrategyInventories} from 'pages/Campaign/hooks/useStrategyInventories';
import {getResponseData} from 'utils/helpers/misc.helpers';

const propTypes = {
  containerId: PropTypes.string
};

const InventoryContentModal = ({containerId}) => {
  // Local states
  const [inventoryIdsChecked, setInventoryIdsChecked] = React.useState([]);

  const dispatch = useDispatch();
  let strategyInventoriesTemp = useStrategyInventoryTempSelector();
  if (!strategyInventoriesTemp) {
    strategyInventoriesTemp = [];
  }

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
      const items = getResponseData(page, IS_RESPONSE_ALL);
      const itemsDestructure = items?.map(item => ({...item, id: item?.uuid}));

      return [...acc, ...itemsDestructure];
    }, []);
  }, [pages]);
  const inventoriesMapping = useStrategyInventories({
    inventories,
    strategyInventories: strategyInventoriesTemp
  });

  React.useEffect(() => {
    const idsTemp =
      strategyInventoriesTemp?.length > 0
        ? strategyInventoriesTemp?.map(item => item?.uuid)
        : [];
    setInventoryIdsChecked(idsTemp);
  }, [strategyInventoriesTemp]);

  const onChangeDealFloorPrice = React.useCallback(
    (value, _inventoryId) => {
      let tmpArr = [...strategyInventoriesTemp];
      tmpArr = tmpArr.map(item => {
        if (item?.uuid === _inventoryId) {
          return {...item, deal_floor_price: value};
        }
        return item;
      });
      dispatch(setStrategyInventoryTempListRedux({inventoryList: tmpArr}));
    },
    [dispatch, strategyInventoriesTemp]
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
      }
    ];
  }, [onChangeDealFloorPrice]);

  const onClickItem = item => {};

  const onClickView = currentItem => {};

  const onClickAction = (actionIndex, currentItem) => {
    if (actionIndex === 0) {
      onClickView(currentItem);
      return;
    }
  };

  function onChangeCheckBox(evt, index, item) {
    const {checked} = evt.target;
    let tmpArr = [];
    let tmpIdsArr = [];

    if (checked) {
      tmpIdsArr = [...inventoryIdsChecked].concat(item?.uuid);
      tmpArr = [...strategyInventoriesTemp].concat(item);
    } else {
      tmpIdsArr = [...inventoryIdsChecked].filter(
        tmpItem => tmpItem !== item.uuid
      );
      tmpArr = [...strategyInventoriesTemp].filter(
        tmpItem => tmpItem.uuid !== item.uuid
      );
    }
    setInventoryIdsChecked([...tmpIdsArr]);
    console.log(
      '🚀 ~ file: InventoryContentModal.js ~ line 193 ~ onChangeCheckBox ~ tmpArr',
      tmpArr
    );

    dispatch(setStrategyInventoryTempListRedux({inventoryList: tmpArr}));
  }

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
            checkable
            checkedValues={inventoryIdsChecked}
            onChangeCheckBox={onChangeCheckBox}
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
