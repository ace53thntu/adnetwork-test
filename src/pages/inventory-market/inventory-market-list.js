import {LoadingIndicator} from 'components/common';
//---> Internal Modules
import {PageTitleAlt} from 'components/layouts/Admin/components';
import AppContent from 'components/layouts/Admin/components/AppContent';
import {AccordionList} from 'components/list';
import {Pagination} from 'components/list/pagination';
import Status from 'components/list/status';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {
  getInventoryFormats,
  getInventoryTypes
} from 'pages/Container/constants';
import {USER_ROLE} from 'pages/user-management/constants';
import {useGetContainersInfinity} from 'queries/container';
//---> Build-in Modules
import React from 'react';
import {useTranslation} from 'react-i18next';
//---> External Modules
import {Card, CardBody, CardHeader, Col, Container, Row} from 'reactstrap';
import {
  useFilterParamsSelector,
  useSearchTypeSelector
} from 'store/reducers/inventory-market';
import {getRole} from 'utils/helpers/auth.helpers';
import {getResponseData} from 'utils/helpers/misc.helpers';
import {capitalize} from 'utils/helpers/string.helpers';
import {isFalsy} from 'utils/validateObject';

import {ContainerPage} from './components';
import {FilterBar, FilterBarForm} from './components/filter-bar';
import {InventoryListLayout} from './components/inventory-list-layout';

const getStatus = ({row, statusProps}) => {
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
      statusProps.color = 'secondary';
      break;
  }

  return statusProps;
};

const InventoryMarket = () => {
  const {t} = useTranslation();
  const role = getRole();
  //---> Query list of containers
  const {
    data: {pages = []} = {},
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useGetContainersInfinity({
    params: {
      per_page: DEFAULT_PAGINATION.perPage,
      sort: 'created_at DESC',
      has_inventory: true
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
  const searchType = useSearchTypeSelector();
  const filterParams = useFilterParamsSelector();

  //---> Define columns
  const columns = React.useMemo(() => {
    return [
      {
        header: 'Name',
        accessor: 'name',
        md: 4,
        sm: 4
      },
      {
        header: 'Url',
        accessor: 'url',
        cell: row => {
          return (
            <a href={`${row.value}`} target="_blank" rel="noreferrer">
              {row.value}
            </a>
          );
        },
        md: 4,
        sm: 4
      },
      {
        header: 'Cost',
        accessor: 'cost',
        cell: row => row?.value?.toString() || '',
        md: 2,
        sm: 2
      },
      {
        accessor: 'status',
        cell: row => {
          let statusProps = {
            label: capitalize(row.value)
          };
          statusProps = getStatus({row, statusProps});
          return <Status {...statusProps} noHeader />;
        },
        md: 2,
        sm: 2
      }
    ].filter(item => {
      if (![USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(role)) {
        if (['cost', 'url'].includes(item.accessor)) {
          return false;
        }
        return true;
      }
      return true;
    });
  }, [role]);

  return (
    <AppContent>
      <PageTitleAlt
        heading={t('inventoryMarket')}
        subheading=""
        icon="pe-7s-cart icon-gradient bg-tempting-azure"
      />
      <Container fluid>
        <Row>
          <Col>
            <FilterBar>
              <FilterBarForm
                typeOptions={getInventoryTypes()}
                formatOptions={getInventoryFormats()}
              />
            </FilterBar>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            {searchType || (filterParams && !isFalsy(filterParams)) ? (
              <InventoryListLayout />
            ) : (
              <Card className="main-card mb-3">
                {/* Render loading indicator */}
                {isFetching && <LoadingIndicator />}
                <CardHeader
                  style={{display: 'flex', justifyContent: 'space-between'}}
                >
                  <div>{t('inventoryMarketList')}</div>
                </CardHeader>
                <CardBody style={{minHeight: '400px'}}>
                  <AccordionList
                    data={containers}
                    columns={columns}
                    detailPanel={rowData => <ContainerPage data={rowData} />}
                    detailCaption={t('pages')}
                  />
                  {hasNextPage && (
                    <Pagination
                      hasNextPage={hasNextPage}
                      isFetchingNextPage={isFetchingNextPage}
                      fetchNextPage={fetchNextPage}
                    />
                  )}
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </AppContent>
  );
};

export default InventoryMarket;
