import {ApiError, LoadingIndicator} from 'components/common';
import CustomPagination from 'components/common/CustomPagination';
import DialogConfirm from 'components/common/DialogConfirm';
import {List} from 'components/list';
import Status from 'components/list/status';
import TagsList from 'components/list/tags/tags';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {RoutePaths} from 'constants/route-paths';
import moment from 'moment';
import {USER_ROLE} from 'pages/user-management/constants';
import {useDeletePublisher, useGetPublishers} from 'queries/publisher';
//---> Build-in Modules
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
//---> External Modules
import {Button, Card, CardBody, CardHeader} from 'reactstrap';
import {useSearchTermSelector} from 'store/reducers/publisher';
import {getRole} from 'utils/helpers/auth.helpers';
import {
  getResponseData,
  getResponsePagination
} from 'utils/helpers/misc.helpers';
import {ShowToast} from 'utils/helpers/showToast.helpers';
//---> Internal Modules
import {capitalize} from 'utils/helpers/string.helpers';

import SearchInput from './components/SearchInput';
import PublisherLayout from './publisher-layout';

const ActionIndex = {
  EDIT: 0,
  DELETE: 1
};

const PublisherList = () => {
  const navigate = useNavigate();
  const role = getRole();
  const {t} = useTranslation();
  const [currentPublisher, setCurrentPublisher] = React.useState(null);
  const [showDialog, setShowDialog] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const searchTerm = useSearchTermSelector();

  const {data, isLoading, isPreviousData} = useGetPublishers({
    params: {
      per_page: DEFAULT_PAGINATION.perPage,
      page: currentPage,
      sort: 'created_at DESC',
      name: searchTerm
    },
    enabled: true,
    keepPreviousData: true
  });

  const publishers = React.useMemo(() => {
    const dataDestructured = getResponseData(data, IS_RESPONSE_ALL);
    return dataDestructured?.map(item => ({...item, id: item?.uuid}));
  }, [data]);

  const paginationInfo = React.useMemo(() => {
    return getResponsePagination(data);
  }, [data]);

  const {
    mutateAsync: deletePublisher,
    isLoading: isLoadingDelete
  } = useDeletePublisher();
  //---> Define columns
  const columns = React.useMemo(() => {
    return [
      {
        header: 'Name',
        accessor: 'name'
      },
      {
        header: 'Domain',
        accessor: 'domain',
        cell: row => <TagsList tagsList={[row?.value] || []} />
      },
      {
        accessor: 'status',
        cell: row => {
          let statusProps = {
            label: capitalize(row?.value)
          };
          switch (row.value) {
            case 'active':
              statusProps.color = 'success';
              break;
            default:
              statusProps.color = 'secondary';
              break;
          }
          return <Status {...statusProps} />;
        }
      },
      {
        header: 'Created at',
        accessor: 'created_at',
        cell: row => moment(row?.value).format('DD/MM/YYYY') || ''
      }
    ];
  }, []);

  function onPageChange(evt, page) {
    evt.preventDefault();
    setCurrentPage(page);
  }

  const onClickAdd = evt => {
    evt.preventDefault();
    navigate(
      `/${RoutePaths.ORGANIZATION}/${RoutePaths.PUBLISHER}/${RoutePaths.CREATE}`
    );
  };

  const onClickItem = data => {
    setCurrentPublisher(data);
    navigate(
      `/${RoutePaths.ORGANIZATION}/${RoutePaths.PUBLISHER}/${data?.uuid}`
    );
  };

  const handleActions = (actionIndex, item) => {
    if (actionIndex === ActionIndex.EDIT) {
      navigate(
        `/${RoutePaths.ORGANIZATION}/${RoutePaths.PUBLISHER}/${item?.uuid}/${RoutePaths.EDIT}`
      );
    }
    if (actionIndex === ActionIndex.DELETE) {
      setCurrentPublisher(item);
      setShowDialog(true);
    }
  };

  const onCancelDelete = () => {
    setShowDialog(false);
  };

  const onSubmitDelete = async () => {
    try {
      await deletePublisher({pubId: currentPublisher?.uuid});
      ShowToast.success('Deleted publisher successfully');
    } catch (err) {
      ShowToast.error(<ApiError apiError={err} />);
    } finally {
      setShowDialog(false);
    }
  };

  return (
    <PublisherLayout>
      <Card className="main-card mb-3">
        <CardHeader style={{display: 'flex', justifyContent: 'space-between'}}>
          <div className="d-flex align-items-center">
            <div className="mr-2">{t('publisherList')}</div>
            <SearchInput />
          </div>
          {[USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(role) && (
            <div className="widget-content-right">
              <Button
                onClick={onClickAdd}
                className="btn-icon"
                size="sm"
                color="primary"
              >
                <i className="pe-7s-plus btn-icon-wrapper"></i>
                {t('create')}
              </Button>
            </div>
          )}
        </CardHeader>
        <CardBody style={{minHeight: '400px'}}>
          {isLoading && <LoadingIndicator />}
          <List
            data={publishers || []}
            columns={columns}
            showAction={
              [USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(role) ? true : false
            }
            actions={
              [USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(role)
                ? [t('edit'), t('delete')]
                : [t('edit')]
            }
            handleAction={handleActions}
            handleClickItem={onClickItem}
          />
          <CustomPagination
            currentPage={currentPage}
            totalCount={paginationInfo?.totalItems}
            onPageChange={(evt, page) => onPageChange(evt, page)}
            disabled={isPreviousData}
          />
        </CardBody>
      </Card>

      {showDialog && (
        <DialogConfirm
          open={showDialog}
          title="Are you sure delete this Publisher?"
          handleClose={onCancelDelete}
          handleAgree={onSubmitDelete}
          isLoading={isLoadingDelete}
        />
      )}
    </PublisherLayout>
  );
};

export default PublisherList;
