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
import {useFormContext} from 'react-hook-form';

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
import {
  setStrategyInventoryTempListRedux,
  useStrategyInventorySelector,
  useStrategyInventoryTempSelector
} from 'store/reducers/campaign';
import {useDispatch} from 'react-redux';
import {useStrategyInventories} from 'pages/Campaign/hooks/useStrategyInventories';
import {getResponseData} from 'utils/helpers/misc.helpers';
import useDeepCompareEffect from 'hooks/useDeepCompareEffect';
import {USER_ROLE} from 'pages/user-management/constants';
import {getRole} from 'utils/helpers/auth.helpers';
import {StrategyTypes} from 'pages/Campaign/constants';
import InventoryPriceModal from '../InventoryPriceModal';
import {convertApiToGui} from 'utils/handleCurrencyFields';

const propTypes = {
  containerId: PropTypes.string
};

const InventoryContentModal = ({containerId}) => {
  const role = getRole();
  const {watch} = useFormContext();
  const strategyTypeSelected = watch('strategy_type');
  const pricingModel = watch('pricing_model');
  const strategyType = strategyTypeSelected?.value;
  // Local states
  const [inventoryIdsChecked, setInventoryIdsChecked] = React.useState([]);

  const dispatch = useDispatch();
  let strategyInventories = useStrategyInventorySelector();

  let strategyInventoriesTemp = useStrategyInventoryTempSelector();
  if (!strategyInventoriesTemp) {
    strategyInventoriesTemp = [];
  }

  let params = {
    per_page: DEFAULT_PAGINATION.perPage
  };

  if (strategyType === StrategyTypes.PREMIUM) {
    params.allow_deal = true;
  }

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
    strategyInventories
  });

  const initChecked = React.useCallback(list => {
    setInventoryIdsChecked(list);
  }, []);

  useDeepCompareEffect(() => {
    const idsTemp =
      strategyInventoriesTemp?.length > 0
        ? strategyInventoriesTemp?.map(item => item?.uuid)
        : [];
    initChecked(idsTemp);
  }, [initChecked, strategyInventoriesTemp]);

  const onChangePriceModelField = React.useCallback(
    (value, _inventoryId) => {
      console.log(
        '???? ~ file: InventoryContentModal.js ~ line 128 ~ InventoryContentModal ~ value',
        value
      );
      let tmpArr = [...strategyInventoriesTemp];
      tmpArr = tmpArr.map(item => {
        if (item?.uuid === _inventoryId) {
          return {...item, ...value, noStore: true};
        }
        return item;
      });
      dispatch(setStrategyInventoryTempListRedux({inventoryList: tmpArr}));
    },
    [dispatch, strategyInventoriesTemp]
  );

  const columns = React.useMemo(() => {
    let baseCols = [
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
        header: 'Format',
        accessor: 'format'
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
        header: 'Position',
        accessor: 'position_name',
        cell: row => <div>{row?.value}</div>
      }
    ];
    let cols = [];
    if (strategyType === StrategyTypes.PREMIUM) {
      cols = [
        ...baseCols,
        {
          header: 'Floor price',
          accessor: 'floor_price',
          cell: row => (
            <InventoryPriceModal
              inventory={row?.original}
              onChangePriceModelField={onChangePriceModelField}
              pricingModel={pricingModel?.value?.toUpperCase()}
              currentPrice={convertApiToGui({
                value: row?.original?.floor_price
              })}
            />
          )
        }
      ];
    } else {
      cols = [
        ...baseCols,
        {
          header: 'Floor Price',
          accessor: 'floor_price',
          cell: row => (
            <InventoryPriceModal
              inventory={row?.original}
              onChangePriceModelField={onChangePriceModelField}
              pricingModel={pricingModel?.value?.toUpperCase()}
              currentPrice={convertApiToGui({
                value: row?.original?.floor_price
              })}
            />
          )
        }
      ];
    }
    return cols.filter(item => {
      if (![USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(role)) {
        if (
          ['market_type', 'deal_floor_price', 'floor_price'].includes(
            item.accessor
          )
        ) {
          return false;
        }
        return true;
      }
      return true;
    });
  }, [onChangePriceModelField, pricingModel?.value, role, strategyType]);

  const onClickItem = item => {
    // setActivatedInventory(item);
  };

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
            actions={[]}
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
