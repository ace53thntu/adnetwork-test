//---> Build-in Modules
import React, {useMemo} from 'react';

//---> External Modules
import {Card, CardHeader, Row, Col, CardBody, Container} from 'reactstrap';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

//---> Internal Modules
import {PageTitleAlt} from 'components/layouts/Admin/components';
import AppContent from 'components/layouts/Admin/components/AppContent';
import {List} from 'components/list';
import LoadingIndicator from 'components/common/LoadingIndicator';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';
import {
  getResponseData,
  getResponsePagination
} from 'utils/helpers/misc.helpers';
import CustomPagination from 'components/common/CustomPagination';
import {useGetLocations} from 'queries/location';
import {Breadcrumbs, Chip, Link, Typography} from '@material-ui/core';
import styled from 'styled-components';
import {SearchInput} from './components';
import {useSearchTermSelector} from 'store/reducers/location';

const LinkStyled = styled(Link)`
  pointer-events: none;
  cursor: default;
  text-decoration: none;
`;

const LocationList = () => {
  const {t} = useTranslation();
  const reduxDispatch = useDispatch();

  React.useEffect(() => {
    reduxDispatch(setEnableClosedSidebar(false));
  }, [reduxDispatch]);

  //---> Define local states.
  const [currentPage, setCurrentPage] = React.useState(1);
  const searchTerm = useSearchTermSelector();

  //---> Query get list of Trackers.
  const {data, isLoading, isPreviousData} = useGetLocations({
    params: {
      limit: DEFAULT_PAGINATION.perPage,
      page: currentPage,
      sort: 'level ASC',
      full_location_name: searchTerm
    },
    enabled: true,
    keepPreviousData: true
  });

  const locations = useMemo(() => {
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
        header: t('LOCATION.LOCATION_NAME'),
        accessor: 'location_name'
      },
      {
        header: t('LOCATION.LOCATION_FULL_NAME'),
        accessor: 'full_location_name',
        cell: row => {
          const splittedLocation = row?.value?.split('>');

          return (
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              {splittedLocation?.length > 0 ? (
                splittedLocation?.map((item, idx) => {
                  return (
                    <div key={idx}>
                      {idx !== splittedLocation.length - 1 ? (
                        <LinkStyled
                          color="inherit"
                          href="#"
                          onClick={evt => evt.preventDefault()}
                        >
                          {item}
                        </LinkStyled>
                      ) : (
                        <Typography color="textPrimary">{item}</Typography>
                      )}
                    </div>
                  );
                })
              ) : (
                <Typography color="textPrimary">{row?.value}</Typography>
              )}
            </Breadcrumbs>
          );
        },
        xs: 4,
        md: 4,
        sm: 4
      },
      {
        header: t('LOCATION.LATITUDE'),
        accessor: 'latitude',
        cell: row => <Chip size="small" label={row?.value} />
      },
      {
        header: t('LOCATION.LONGITUDE'),
        accessor: 'longitude',
        cell: row => <Chip size="small" label={row?.value} />
      },
      {
        header: t('LOCATION.TIME_ZONE'),
        accessor: 'time_zone',
        cell: row => <Chip size="small" label={row?.value} />
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
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardHeader
                  style={{display: 'flex', justifyContent: 'space-between'}}
                >
                  <div className="d-flex align-items-center">
                    <div className="mr-2">{t('LOCATION.LOCATION_LIST')}</div>
                    <SearchInput />
                  </div>

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
                    <List
                      data={locations || []}
                      columns={columns}
                      showAction={false}
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
