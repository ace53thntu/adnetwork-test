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
import {useDeletePublisher, useGetPublishersInfinity} from 'queries/publisher';
import DialogConfirm from 'components/common/DialogConfirm';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {Pagination} from 'components/list/pagination';
import PublisherLayout from './publisher-layout';
import {getResponseData} from 'utils/helpers/misc.helpers';

const PublisherList = () => {
  const reduxDispatch = useDispatch();
  const {t} = useTranslation();
  const [openForm, setOpenForm] = React.useState(false);
  const [openFormEdit, setOpenFormEdit] = React.useState(false);
  const [currentPublisher, setCurrentPublisher] = React.useState(null);
  const [showDialog, setShowDialog] = React.useState(false);
  const {
    data: {pages = []} = {},
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useGetPublishersInfinity({
    params: {
      limit: DEFAULT_PAGINATION.perPage
    },
    enabled: true
  });

  const publishers = React.useMemo(() => {
    return pages?.reduce((acc, page) => {
      const data = getResponseData(page, IS_RESPONSE_ALL);
      const dataDestructured = data?.map(item => ({...item, id: item?.uuid}));
      return [...acc, ...dataDestructured];
    }, []);
  }, [pages]);

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
        {isFetching && <LoadingIndicator />}

        <CardHeader style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>{t('publisherList')}</div>
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
        </CardHeader>
        <CardBody style={{minHeight: '400px'}}>
          <List
            data={publishers || []}
            columns={columns}
            showAction
            actions={['Delete']}
            handleAction={onHandleDelete}
            handleClickItem={onClickItem}
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
      {/* Advertiser Create */}
      <PublisherCreate>
        {openForm && <PublisherForm modal={openForm} toggle={onToggleModal} />}
      </PublisherCreate>
      {/* Advertiser Edit */}
      <PublisherEdit>
        {openFormEdit && (
          <PublisherForm
            modal={openFormEdit}
            toggle={onToggleModalEdit}
            title="Edit Publisher"
            isEdit
            publisherId={currentPublisher?.uuid}
          />
        )}
      </PublisherEdit>
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
