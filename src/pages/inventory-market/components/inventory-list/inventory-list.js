/**
 * Copyright (c) 2021-present, AiCactus, Inc.
 * All rights reserved.
 *
 * @flow
 */

//---> Build-in Modules
import React, {useState} from 'react';

//---> External Modules
import {Badge, Modal} from 'reactstrap';
import {formatValue} from 'react-currency-input-field';

//---> Internal Modules
import {LoadingIndicator} from 'components/common';
import {List} from 'components/list';
import NoDataAvailable from 'components/list/no-data';
import {useInventoriesByContainer} from '../../hooks';
import {
  getInventoryMarketTypeColor,
  getInventoryTypeColor
} from '../../helpers';

import {useGetInventoriesInfinity} from 'queries/inventory';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {Pagination} from 'components/list/pagination';
import {InventoryDetails} from '..';
import {isFalsy} from 'utils/validateObject';
import {mappingFormToApi} from '../filter-bar/dto';
import {
  useFilterModeSelector,
  useSearchTypeSelector
} from 'store/reducers/inventory-market';
import {getResponseData} from 'utils/helpers/misc.helpers';
import {USER_ROLE} from 'pages/user-management/constants';
import {getRole} from 'utils/helpers/auth.helpers';
import * as HandleCurrencyFields from 'utils/handleCurrencyFields';

import './styles.scss';

const ActionIndexes = {
  VIEW: 0,
  BID: 1,
  DEAL: 2
};

const filterColumns = (item, role) => {
  if (![USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(role)) {
    if (
      ['market_type', 'deal_floor_price', 'floor_price'].includes(item.accessor)
    ) {
      return false;
    }
    return true;
  }
  return true;
};

const useColumns = (role, fromPage) => {
  return React.useMemo(() => {
    const baseCols = [
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
        header: 'Format',
        accessor: 'format'
      },
      {
        header: 'Deal floor price',
        accessor: 'deal_floor_price',
        cell: row => {
          if (row?.original?.allow_deal) {
            return (
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
            );
          }

          return 'N/A';
        }
      },
      {
        header: 'Floor price',
        accessor: 'floor_price',
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
      }
    ];
    let cols = [];
    if (!fromPage) {
      cols = [
        {
          header: 'Container Name',
          accessor: 'container_name'
        },
        {
          header: 'Page Name',
          accessor: 'page_name'
        },
        ...baseCols
      ];
    } else {
      cols = baseCols;
    }

    return cols.filter(item => filterColumns(item, role));
  }, [fromPage, role]);
};

const InventoryList = ({page, filterParams = null, fromPage = false}) => {
  const role = getRole();

  const searchType = useSearchTypeSelector();
  const filterMode = useFilterModeSelector();

  let params = {
    limit: DEFAULT_PAGINATION.perPage
  };

  if (page) {
    params.page_uuid = page?.uuid;
  }

  if (filterParams && !isFalsy(filterParams)) {
    const filterParamsDestructured = mappingFormToApi({
      formData: filterParams,
      searchType,
      filterMode
    });

    params = {...params, ...filterParamsDestructured};
  }

  const {
    data: {pages = []} = {},
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useGetInventoriesInfinity({params, enabled: true});

  const containerInventories = React.useMemo(() => {
    return pages?.reduce((acc, page) => {
      const items = getResponseData(page, IS_RESPONSE_ALL);
      return [...acc, ...items];
    }, []);
  }, [pages]);

  const inventories = useInventoriesByContainer({
    data: containerInventories
  });
  const columns = useColumns(role, fromPage);

  //---> Define local states.
  const [openModal, setOpenModal] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [isDeal, setIsDeal] = useState(false);
  const [isBid, setIsBid] = useState(false);

  const onToggleModal = () => {
    setOpenModal(prevState => !prevState);
  };

  const onClickItem = item => {
    setIsBid(false);
    setIsDeal(false);
    setOpenModal(true);
    setSelectedInventory(item);
  };

  const onClickView = currentItem => {
    setOpenModal(true);
    setIsBid(false);
    setIsDeal(false);
    setSelectedInventory(currentItem);
  };

  const onClickBid = currentItem => {
    setOpenModal(true);
    setIsBid(true);
    setIsDeal(false);
    setSelectedInventory(currentItem);
  };

  const onClickDeal = currentItem => {
    setOpenModal(true);
    setIsDeal(true);
    setIsBid(false);
    setSelectedInventory(currentItem);
  };

  const onClickAction = (actionIndex, currentItem) => {
    if (actionIndex === ActionIndexes.VIEW) {
      onClickView(currentItem);
      return;
    }

    if (actionIndex === ActionIndexes.BID) {
      onClickBid(currentItem);
      return;
    }

    if (actionIndex === ActionIndexes.DEAL) {
      onClickDeal(currentItem);
      return;
    }
  };

  return (
    <React.Fragment>
      {isFetching && <LoadingIndicator />}
      {inventories?.length > 0 ? (
        <>
          <List
            showAction
            data={inventories}
            columns={columns}
            // actions={['View', 'Create Bid', 'Create Deal']}
            handleClickItem={onClickItem}
            handleAction={(actionIndex, currentItem) =>
              onClickAction(actionIndex, currentItem)
            }
            isShowInventoryHighlight
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
      <Modal
        unmountOnClose
        size="lg"
        className="modal-dialog shadow-none"
        isOpen={openModal}
        style={{maxWidth: 1000}}
      >
        <InventoryDetails
          modal={openModal}
          toggle={onToggleModal}
          inventoryData={selectedInventory}
          isDeal={isDeal}
          isBid={isBid}
          params={params}
        />
      </Modal>
    </React.Fragment>
  );
};

export default InventoryList;
