/**
 * Copyright (c) 2021-present, AiCactus, Inc.
 * All rights reserved.
 *
 * @flow
 */

//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {Button, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {useTranslation} from 'react-i18next';

//---> Internal Modules
import {AccordionList} from 'components/list';
import {capitalize} from 'utils/helpers/string.helpers';
import Status from 'components/list/status';
import {LoadingIndicator} from 'components/common';
import NoDataAvailable from 'components/list/no-data';
import {useGetContainersInfinity} from 'queries/container';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {Pagination} from 'components/list/pagination';
import InventoryContentModal from './InventoryContentModal';
import {getResponseData} from 'utils/helpers/misc.helpers';
import {InventoryModalStyled} from '../styled';
import {useDispatch} from 'react-redux';
import {
  setStrategyInventoryListRedux,
  useStrategyInventoryTempSelector
} from 'store/reducers/campaign';

const propTypes = {
  onToggleModal: PropTypes.func,
  openModal: PropTypes.bool
};

const InventoryModal = ({onToggleModal = () => null, openModal = false}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const strategyInventoriesTemp = useStrategyInventoryTempSelector();

  const {
    data: {pages = []} = {},
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useGetContainersInfinity({
    params: {
      limit: DEFAULT_PAGINATION.perPage
    },
    enabled: true
  });

  const containers = React.useMemo(() => {
    return pages?.reduce((acc, page) => {
      const items = getResponseData(page, IS_RESPONSE_ALL);
      const itemsDestructure = items?.map(item => ({...item, id: item?.uuid}));
      return [...acc, ...itemsDestructure];
    }, []);
  }, [pages]);

  const columns = React.useMemo(() => {
    return [
      {
        header: 'Container Name',
        accessor: 'name'
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

  function onAddInventories(inventories = []) {
    dispatch(
      setStrategyInventoryListRedux({inventoryList: strategyInventoriesTemp})
    );
    onToggleModal();
  }

  return (
    <InventoryModalStyled toggle={onToggleModal} isOpen={openModal} unMount>
      <ModalHeader toggle={onToggleModal}>{t('inventoryList')}</ModalHeader>
      <ModalBody>
        {isFetching && <LoadingIndicator />}
        {containers?.length > 0 ? (
          <AccordionList
            data={containers}
            columns={columns}
            detailPanel={rowData => {
              return <InventoryContentModal containerId={rowData?.uuid} />;
            }}
            detailCaption={t('inventories')}
          />
        ) : (
          <NoDataAvailable />
        )}
        {hasNextPage && (
          <Pagination
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        )}
      </ModalBody>
      <ModalFooter>
        <Button type="button" onClick={onToggleModal} color="link">
          {t('cancel')}
        </Button>
        <Button type="button" color="primary" onClick={onAddInventories}>
          {t('add')}
        </Button>
      </ModalFooter>
    </InventoryModalStyled>
  );
};

InventoryModal.propTypes = propTypes;

export default InventoryModal;
