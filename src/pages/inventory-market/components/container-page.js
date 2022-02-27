/**
 * Copyright (c) 2021-present, AiCactus, Inc.
 * All rights reserved.
 *
 * @flow
 */

//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';

//---> Internal Modules
import {AccordionList} from 'components/list';
import {capitalize} from 'utils/helpers/string.helpers';
import Status from 'components/list/status';
import {LoadingIndicator} from 'components/common';
import NoDataAvailable from 'components/list/no-data';
import {useGetPagesByContainer} from 'queries/page';
import {InventoryContainer} from '.';

const ContainerPage = ({data}) => {
  const {t} = useTranslation();
  const {data: containerPages = [], isLoading} = useGetPagesByContainer(
    data?.uuid
  );

  const pages = React.useMemo(() => {
    return containerPages?.map(item => ({...item, id: item?.uuid}));
  }, [containerPages]);

  const columns = React.useMemo(() => {
    return [
      {
        header: 'Name',
        accessor: 'name'
      },
      {
        header: 'Source',
        accessor: 'source'
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
      {isLoading && <LoadingIndicator />}
      {pages?.length > 0 ? (
        <AccordionList
          data={pages}
          columns={columns}
          detailPanel={rowData => {
            return <InventoryContainer page={rowData} />;
          }}
          detailCaption={t('inventories')}
        />
      ) : (
        <NoDataAvailable />
      )}
    </React.Fragment>
  );
};

export default ContainerPage;
