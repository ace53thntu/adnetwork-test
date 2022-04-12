//---> Build-in Modules
import React, {useMemo} from 'react';

//---> External Modules
import {Card, CardHeader, Row, Col, CardBody, Container} from 'reactstrap';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

//---> Internal Modules
import {PageTitleAlt} from 'components/layouts/Admin/components';
import AppContent from 'components/layouts/Admin/components/AppContent';
import {AccordionList} from 'components/list';
import LoadingIndicator from 'components/common/LoadingIndicator';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';
import {
  getResponseData,
  getResponsePagination
} from 'utils/helpers/misc.helpers';
import CustomPagination from 'components/common/CustomPagination';
import {useGetLocations} from 'queries/location';
import {CityList} from './components';
import FilterBar from './components/FilterBar';

const LocationList = () => {
  const {t} = useTranslation();
  const reduxDispatch = useDispatch();

  React.useEffect(() => {
    reduxDispatch(setEnableClosedSidebar(false));
  }, [reduxDispatch]);

  //---> Define local states.
  const [currentPage, setCurrentPage] = React.useState(1);

  //---> Query get list of Trackers.
  const {data, isLoading, isPreviousData} = useGetLocations({
    params: {
      limit: DEFAULT_PAGINATION.perPage,
      page: currentPage,
      sort: 'created_at DESC'
    },
    enabled: true,
    keepPreviousData: true
  });

  const countries = useMemo(() => {
    const dataDestructured = getResponseData(data, IS_RESPONSE_ALL);
    return dataDestructured?.map(item => ({...item, id: item?.uuid}));
  }, [data]);
  const paginationInfo = React.useMemo(() => {
    return getResponsePagination(data);
  }, [data]);

  //---> Define columns
  const columns = useMemo(() => {
    return [
      {
        header: t('LOCATION.COUNTRY_NAME'),
        accessor: 'country_name'
      },
      {
        header: t('LOCATION.CONTINENT_NAME'),
        accessor: 'continent_name'
      }
    ];
  }, [t]);

  function onPageChange(evt, page) {
    evt.preventDefault();
    setCurrentPage(page);
  }

  return (
    <>
      <AppContent>
        <PageTitleAlt
          heading={t('LOCATION.MANAGE_LOCATION')}
          subheading=""
          icon="pe-7s-map-marker icon-gradient bg-tempting-azure"
        />
        <Container fluid>
          {/* TODO: IN-PROGRESS */}
          {false && (
            <Row className="mb-3">
              <Col>
                <FilterBar />
              </Col>
            </Row>
          )}

          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardHeader
                  style={{display: 'flex', justifyContent: 'space-between'}}
                >
                  <div>{t('LOCATION.COUNTRY_LIST')}</div>
                  <div className="widget-content-right">
                    {/* <Button
                      onClick={onClickAdd}
                      className="btn-icon"
                      size="sm"
                      color="primary"
                    >
                      <i className="pe-7s-plus btn-icon-wrapper"></i>
                      {t('create')}
                    </Button> */}
                  </div>
                </CardHeader>
                <CardBody style={{minHeight: '400px'}}>
                  {isLoading ? (
                    <LoadingIndicator />
                  ) : (
                    <AccordionList
                      data={countries || []}
                      columns={columns}
                      showAction={false}
                      detailPanel={rowData => (
                        <CityList countryId={rowData?.uuid} />
                      )}
                      detailCaption={t('cities')}
                    />
                  )}

                  <CustomPagination
                    currentPage={currentPage}
                    totalCount={paginationInfo?.totalItems}
                    onPageChange={(evt, page) => onPageChange(evt, page)}
                    disabled={isPreviousData}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </AppContent>
    </>
  );
};

export default LocationList;
