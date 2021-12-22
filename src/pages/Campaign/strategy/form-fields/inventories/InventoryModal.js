/**
 * Copyright (c) 2021-present, AiCactus, Inc.
 * All rights reserved.
 *
 * @flow
 */

//---> Build-in Modules
import React from 'react';

//---> Internal Modules
import {AccordionList} from 'components/list';
import {capitalize} from 'utils/helpers/string.helpers';
import Status from 'components/list/status';
import {LoadingIndicator} from 'components/common';
import NoDataAvailable from 'components/list/no-data';
import {useTranslation} from 'react-i18next';
import {useGetContainersInfinity} from 'queries/container';
import {DEFAULT_PAGINATION} from 'constants/misc';
import {Pagination} from 'components/list/pagination';
import InventoryContentModal from './InventoryContentModal';

const propTypes = {};

const InventoryModal = () => {
  const {t} = useTranslation();
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
      const {items = []} = page;
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

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

InventoryModal.propTypes = propTypes;

export default InventoryModal;
