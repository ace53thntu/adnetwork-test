//---> Build-in Modules
import React from 'react';

//---> External Modules
import {Card, CardHeader, Button, CardBody} from 'reactstrap';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import {useDispatch} from 'react-redux';

//---> Internal Modules
import {capitalize} from 'utils/helpers/string.helpers';
import {List} from 'components/list';
import Status from 'components/list/status';
import TagsList from 'components/list/tags/tags';
import PublisherCreate from './publisher-create';
import PublisherEdit from './publisher-edit';
import {PublisherForm} from './components';
import {LoadingIndicator} from 'components/common';
import {useDeletePublisher, useGetPublishers} from 'queries/publisher';
import DialogConfirm from 'components/common/DialogConfirm';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import PublisherLayout from './publisher-layout';
import {
  getResponseData,
  getResponsePagination
} from 'utils/helpers/misc.helpers';
import CustomPagination from 'components/common/CustomPagination';
import {getRole} from 'utils/helpers/auth.helpers';
import {USER_ROLE} from 'pages/user-management/constants';

const PublisherList = () => {
  const reduxDispatch = useDispatch();
  const role = getRole();
  const {t} = useTranslation();
  const [openForm, setOpenForm] = React.useState(false);
  const [openFormEdit, setOpenFormEdit] = React.useState(false);
  const [currentPublisher, setCurrentPublisher] = React.useState(null);
  const [showDialog, setShowDialog] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

  const {data, isLoading, isPreviousData} = useGetPublishers({
    params: {
      per_page: DEFAULT_PAGINATION.perPage,
      page: currentPage,
      sort: 'created_at DESC'
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
              statusProps.color = 'error';
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

  const onToggleModal = () => {
    setOpenForm(prevState => !prevState);
  };

  const onToggleModalEdit = () => {
    setOpenFormEdit(prevState => !prevState);
  };

  const onClickAdd = evt => {
    evt.preventDefault();
    setOpenForm(true);
  };

  const onClickItem = data => {
    setCurrentPublisher(data);
    setOpenFormEdit(true);
  };

  const onHandleDelete = (actionIndex, item) => {
    setCurrentPublisher(item);
    setShowDialog(true);
  };

  const onCancelDelete = () => {
    setShowDialog(false);
  };

  const onSubmitDelete = async () => {
    try {
      await deletePublisher({pubId: currentPublisher?.uuid});
      ShowToast.success('Deleted publisher successfully');
    } catch (err) {
      ShowToast.error(err || 'Fail to delete publisher');
    } finally {
      setShowDialog(false);
    }
  };

  React.useEffect(() => {
    reduxDispatch(setEnableClosedSidebar(false));
  }, [reduxDispatch]);

  return (
    <PublisherLayout>
      <Card className="main-card mb-3">
        <CardHeader style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>{t('publisherList')}</div>
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
                ? ['Delete']
                : []
            }
            handleAction={onHandleDelete}
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
      {/* Advertiser Create */}
      <PublisherCreate>
        {openForm && <PublisherForm modal={openForm} toggle={onToggleModal} />}
      </PublisherCreate>
      {/* Advertiser Edit */}
      <PublisherEdit
        modal={openFormEdit}
        toggle={onToggleModalEdit}
        title="Edit Publisher"
        isEdit
        publisherId={currentPublisher?.uuid}
      />

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
