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

//---> Internal Modules
import {LoadingIndicator} from 'components/common';
import {List} from 'components/list';
import NoDataAvailable from 'components/list/no-data';
import {useInventoriesByContainer} from '../hooks';
import {InventoryDetails} from '.';
import {getInventoryTypeColor} from '../helpers';
import {useGetPositions} from 'queries/position';
import {useGetDsps} from 'queries/dsp';
import {useOptionsList} from 'hooks';
import {useGetAudiences} from 'queries/audience';
import {useGetDeals} from 'queries/deal';
import './styles.scss';
import {useGetInventoryByPage} from 'queries/inventory';

const InventoryContainer = ({page}) => {
  const {data: positions = []} = useGetPositions();

  const {data: containerInventories, isLoading} = useGetInventoryByPage(
    page?.uuid
  );
  console.log(
    '🚀 ~ file: container-inventory.js ~ line 34 ~ InventoryContainer ~ containerInventories',
    containerInventories
  );
  const inventories = useInventoriesByContainer({
    data: containerInventories,
    page,
    positions
  });
  const {data: dspResp} = useGetDsps();
  const dspOptions = useOptionsList({list: dspResp?.items});
  const {data: audienceResp} = useGetAudiences();
  const audienceOptions = useOptionsList({list: audienceResp?.items});
  const {data: dealResp} = useGetDeals();
  const dealOptions = useOptionsList({list: dealResp?.items});

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
        header: 'Total Bids',
        accessor: 'total_active_bids',
        cell: row => (
          <Badge color="light" pill>
            {row?.value || 0}
          </Badge>
        )
      },
      {
        header: 'Total Deal',
        accessor: 'total_active_deals',
        cell: row => (
          <Badge color="light" pill>
            {row?.value || 0}
          </Badge>
        )
      }
    ];
  }, []);

  //---> Define local states.
  const [openModal, setOpenModal] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [isDeal, setIsDeal] = useState(false);
  const [isBid, setIsBid] = useState(false);

  const onToggleModal = () => {
    setOpenModal(prevState => !prevState);
  };

  const onClickItem = item => {
    setOpenModal(true);
    setSelectedInventory(item);
  };

  const onClickView = currentItem => {
    setOpenModal(true);
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
    console.log(
      '🚀 ~ file: container-inventory.js ~ line 150 ~ onClickAction ~ currentItem',
      currentItem
    );
    if (actionIndex === 0) {
      onClickView(currentItem);
      return;
    }

    if (actionIndex === 1) {
      onClickBid(currentItem);
      return;
    }

    if (actionIndex === 2) {
      onClickDeal(currentItem);
      return;
    }
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
          handleAction={(actionIndex, currentItem) =>
            onClickAction(actionIndex, currentItem)
          }
        />
      ) : (
        <NoDataAvailable />
      )}
      <Modal
        unmountOnClose
        size="lg"
        className="modal-dialog shadow-none"
        isOpen={openModal}
      >
        <InventoryDetails
          modal={openModal}
          toggle={onToggleModal}
          inventoryData={selectedInventory}
          isDeal={isDeal}
          isBid={isBid}
          dspOptions={dspOptions}
          audienceOptions={audienceOptions}
          dealOptions={dealOptions}
        />
      </Modal>
    </React.Fragment>
  );
};

export default InventoryContainer;
