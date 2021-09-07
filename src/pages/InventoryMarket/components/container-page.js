//---> Build-in Modules
import React from 'react';

//---> External Modules
import moment from 'moment';

//---> Internal Modules
import {AccordionList} from 'components/list';
import {capitalize} from 'utils/helpers/string.helpers';
import Status from 'components/list/status';
import {LoadingIndicator} from 'components/common';
import NoDataAvailable from 'components/list/no-data';
import {useGetPagesByContainer} from 'queries/page';
import {useTranslation} from 'react-i18next';
import {InventoryContainer} from '.';

const ContainerPage = ({data}) => {
  const {t} = useTranslation();
  const {data: containerPages, isLoading} = useGetPagesByContainer(data?.uuid);

  console.log('-containerPages', containerPages);

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
      },
      {
        header: 'Created at',
        accessor: 'created_at',
        cell: row => {
          if (row.value) {
            return row.value ? moment(row.value).format('DD/MM/YYYY') : null;
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
      {containerPages?.length > 0 ? (
        <AccordionList
          data={containerPages}
          columns={columns}
          detailPanel={rowData => {
            return <InventoryContainer data={rowData} />;
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
