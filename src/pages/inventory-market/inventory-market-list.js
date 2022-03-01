//---> Build-in Modules
import React from 'react';

//---> External Modules
import {Card, CardHeader, Row, Col, CardBody, Container} from 'reactstrap';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

//---> Internal Modules
import {PageTitleAlt} from 'components/layouts/Admin/components';
import {LoadingIndicator} from 'components/common';
import {useGetContainersInfinity} from 'queries/container';
import {AccordionList} from 'components/list';
import {capitalize} from 'utils/helpers/string.helpers';
import Status from 'components/list/status';
import {ContainerPage} from './components';
import AppContent from 'components/layouts/Admin/components/AppContent';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';
import {FilterBar, FilterBarForm} from './components/filter-bar';
import {
  getInventoryFormats,
  getInventoryTypes
} from 'pages/Container/constants';
import {
  useFilterParamsSelector,
  useSearchTypeSelector
} from 'store/reducers/inventory-market';
import {InventoryListLayout} from './components/inventory-list-layout';
import {isFalsy} from 'utils/validateObject';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {Pagination} from 'components/list/pagination';
import {getResponseData} from 'utils/helpers/misc.helpers';

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
      statusProps.color = 'error';
      break;
  }

  return statusProps;
};

const InventoryMarket = () => {
  const {t} = useTranslation();
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
        accessor: 'name'
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
        }
      },
      {
        header: 'Cost',
        accessor: 'cost',
        cell: row => row?.value?.toString() || ''
      },
      {
        accessor: 'status',
        cell: row => {
          let statusProps = {
            label: capitalize(row.value)
          };
          statusProps = getStatus({row, statusProps});
          return <Status {...statusProps} noHeader />;
        }
      }
    ];
  }, []);

  const reduxDispatch = useDispatch();

  React.useEffect(() => {
    reduxDispatch(setEnableClosedSidebar(false));
  }, [reduxDispatch]);

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
