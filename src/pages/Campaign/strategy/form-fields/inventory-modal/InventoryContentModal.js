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

const propTypes = {
  containerId: PropTypes.string
};

const InventoryContentModal = ({containerId}) => {
  console.log(
    '🚀 ~ file: InventoryContentModal.js ~ line 34 ~ InventoryContentModal ~ containerId',
    containerId
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
        cell: row => <DealFloorPriceInput defaultValue={row?.value || 0} />
      },
      {
        header: 'Actions',
        accessor: 'action',
        cell: row => <Button color="info">Add</Button>
      }
    ];
  }, []);

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
            data={inventories}
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
