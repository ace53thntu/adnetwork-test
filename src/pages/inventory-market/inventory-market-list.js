//---> Build-in Modules
import React from 'react';

//---> External Modules
import {Card, CardHeader, Row, Col, CardBody, Container} from 'reactstrap';
import moment from 'moment';

//---> Internal Modules
import {PageTitleAlt} from 'components/layouts/Admin/components';
import {LoadingIndicator} from 'components/common';
import {useTranslation} from 'react-i18next';
import {useGetContainers} from 'queries/container';
import {AccordionList} from 'components/list';
import {capitalize} from 'utils/helpers/string.helpers';
import Status from 'components/list/status';
import {ContainerPage} from './components';
import AppContent from 'components/layouts/Admin/components/AppContent';
import {useDispatch} from 'react-redux';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';
import {FilterBar, FilterBarForm} from './components/filter-bar';
import {
  getInventoryFormats,
  getInventoryTypes
} from 'pages/Container/constants';
import {useSearchTypeSelector} from 'store/reducers/inventory-market';
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
      statusProps.color = 'error';
      break;
  }

  return statusProps;
};

const InventoryMarket = () => {
  const {t} = useTranslation();
  //---> Query list of containers
  const {data: containersRes = [], isLoading} = useGetContainers({
    params: {limit: 1000, page: 1},
    enabled: true
  });
  const containers = React.useMemo(() => {
    return containersRes?.items?.map(item => ({...item, id: item?.uuid})) || [];
  }, [containersRes?.items]);
  const searchType = useSearchTypeSelector();

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
        accessor: 'status',
        cell: row => {
          let statusProps = {
            label: capitalize(row.value)
          };
          statusProps = getStatus({row, statusProps});
          return <Status {...statusProps} noHeader />;
        }
      },
      {
        header: 'Created at',
        accessor: 'created_at',
        cell: row => {
          return row.value ? moment(row.value).format('DD/MM/YYYY') : null;
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
            {searchType ? (
              <InventoryListLayout />
            ) : (
              <Card className="main-card mb-3">
                {/* Render loading indicator */}
                {isLoading && <LoadingIndicator />}
                <CardHeader
                  style={{display: 'flex', justifyContent: 'space-between'}}
                >
                  <div>{t('inventoryMarketList')}</div>
                </CardHeader>
                <CardBody style={{minHeight: '400px'}}>
                  <AccordionList
                    data={containers}
                    columns={columns}
                    detailPanel={rowData => {
                      return <ContainerPage data={rowData} />;
                    }}
                    detailCaption={t('pages')}
                  />
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