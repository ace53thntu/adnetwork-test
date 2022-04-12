//---> Build-in Modules
import React, {useMemo} from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

//---> Internal Modules

import LoadingIndicator from 'components/common/LoadingIndicator';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';
import {
  getResponseData,
  getResponsePagination
} from 'utils/helpers/misc.helpers';
import CustomPagination from 'components/common/CustomPagination';
import {useGetCities} from 'queries/location';
import {List} from 'components/list';
import {Badge} from 'reactstrap';

const CityList = ({countryId = ''}) => {
  const {t} = useTranslation();
  const reduxDispatch = useDispatch();

  React.useEffect(() => {
    reduxDispatch(setEnableClosedSidebar(false));
  }, [reduxDispatch]);

  //---> Define local states.
  const [currentPage, setCurrentPage] = React.useState(1);

  let params = {
    per_page: DEFAULT_PAGINATION.perPage,
    page: currentPage,
    sort: 'created_at DESC'
  };

  if (countryId) {
    params.geo_country_uuid = countryId;
  }

  //---> Query get list of Trackers.
  const {data, isLoading, isPreviousData} = useGetCities({
    params,
    enabled: true,
    keepPreviousData: true
  });

  const cities = useMemo(() => {
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
        header: t('LOCATION.CITY_NAME'),
        accessor: 'city_name'
      },
      {
        header: t('LOCATION.FIRST_DIVISION'),
        accessor: 'first_division'
      },
      {
        header: t('LOCATION.LATITUDE'),
        accessor: 'latitude',
        cell: row => <Badge color="info">{row?.value}</Badge>
      },
      {
        header: t('LOCATION.LONGITUDE'),
        accessor: 'longitude',
        cell: row => <Badge color="info">{row?.value}</Badge>
      },
      {
        header: t('LOCATION.TIME_ZONE'),
        accessor: 'time_zone',
        cell: row => <Badge color="light">{row?.value}</Badge>
      }
    ];
  }, [t]);

  function onPageChange(evt, page) {
    evt.preventDefault();
    setCurrentPage(page);
  }

  return (
    <div style={{minHeight: '400px'}}>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <List data={cities || []} columns={columns} showAction={false} />
      )}

      <CustomPagination
        currentPage={currentPage}
        totalCount={paginationInfo?.totalItems}
        onPageChange={(evt, page) => onPageChange(evt, page)}
        disabled={isPreviousData}
      />
    </div>
  );
};

export default CityList;
