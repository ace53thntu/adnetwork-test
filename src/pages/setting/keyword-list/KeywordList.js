//---> Build-in Modules
import React, {useMemo} from 'react';

//---> External Modules
import {
  Card,
  CardHeader,
  Button,
  Row,
  Col,
  CardBody,
  Container,
  Badge
} from 'reactstrap';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import {useDispatch} from 'react-redux';

//---> Internal Modules
import {PageTitleAlt} from 'components/layouts/Admin/components';
import AppContent from 'components/layouts/Admin/components/AppContent';
import {List} from 'components/list';
import {CustomStatus} from 'components/list/status';
import LoadingIndicator from 'components/common/LoadingIndicator';
import DialogConfirm from 'components/common/DialogConfirm';
import {capitalize} from 'utils/helpers/string.helpers';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';
import {
  getResponseData,
  getResponsePagination
} from 'utils/helpers/misc.helpers';
import CustomPagination from 'components/common/CustomPagination';
import {ModalLayout} from 'components/forms';
import {
  useDeleteKeywordList,
  useGetKeywordList,
  useGetKeywordLists
} from 'queries/keyword-list';
import KeywordListCreate from './KeywordListCreate';
import KeywordListEdit from './KeywordListEdit';
import KeywordListForm from './components/keyword-list.form';
import KeywordBadge from './components/KeywordBadge';

const propTypes = {};

const KeywordList = () => {
  const {t} = useTranslation();
  const reduxDispatch = useDispatch();

  React.useEffect(() => {
    reduxDispatch(setEnableClosedSidebar(false));
  }, [reduxDispatch]);

  //---> Define local states.
  const [currentKeywordList, setCurrentKeywordList] = React.useState(null);
  const [showDialog, setShowDialog] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const [openFormEdit, setOpenFormEdit] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

  //---> Query get list of Domains.
  const {data, isLoading, isPreviousData} = useGetKeywordLists({
    params: {
      limit: DEFAULT_PAGINATION.perPage,
      page: currentPage,
      sort: 'created_at DESC'
    },
    enabled: true,
    keepPreviousData: true
  });

  const keywordLists = useMemo(() => {
    const dataDestructured = getResponseData(data, IS_RESPONSE_ALL);
    return dataDestructured?.map(item => ({...item, id: item?.uuid}));
  }, [data]);
  const paginationInfo = React.useMemo(() => {
    return getResponsePagination(data);
  }, [data]);

  //---> Mutation delete keyword list
  const {
    mutateAsync: deleteKeywordList,
    isLoading: isLoadingDelete
  } = useDeleteKeywordList();

  const {data: keywordList} = useGetKeywordList({
    keywordListId: currentKeywordList?.uuid,
    enabled: !!currentKeywordList?.uuid
  });

  //---> Define columns
  const columns = useMemo(() => {
    return [
      {
        header: 'Name',
        accessor: 'name'
      },
      {
        header: 'Keywords',
        accessor: 'keywords',
        cell: row => <KeywordBadge keywords={row?.value || []} />
      },
      {
        accessor: 'shared',
        cell: row => (
          <Badge color={row?.value ? 'primary' : 'warning'}>
            {row?.value ? 'shared' : 'un-share'}
          </Badge>
        )
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
          return <CustomStatus {...statusProps} />;
        }
      },
      {
        header: 'Updated at',
        accessor: 'updated_at',
        cell: row => moment(row?.value).format('DD/MM/YYYY')
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
    setCurrentKeywordList(data);
    setOpenFormEdit(true);
  };

  const onClickDelete = (actionIndex, item) => {
    setShowDialog(true);
    setCurrentKeywordList(item);
  };

  const onCancelDelete = () => {
    setShowDialog(false);
  };

  const onSubmitDelete = async () => {
    try {
      await deleteKeywordList({keywordListId: currentKeywordList?.uuid});
      ShowToast.success('Deleted keyword list successfully');
    } catch (err) {
      ShowToast.error(err || 'Fail to delete keyword list');
    } finally {
      setShowDialog(false);
    }
  };

  return (
    <>
      <AppContent>
        <PageTitleAlt
          heading={t('manageKeywordList')}
          subheading=""
          icon="pe-7s-search icon-gradient bg-tempting-azure"
        />
        <Container fluid>
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardHeader
                  style={{display: 'flex', justifyContent: 'space-between'}}
                >
                  <div>{t('keywordList')}</div>
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
                  {isLoading ? (
                    <LoadingIndicator />
                  ) : (
                    <List
                      data={keywordLists || []}
                      columns={columns}
                      showAction
                      actions={['Delete']}
                      handleAction={onClickDelete}
                      handleClickItem={onClickItem}
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
      {/* Create keyword list */}
      <KeywordListCreate>
        {openForm && (
          <ModalLayout modal={openForm}>
            <KeywordListForm toggle={onToggleModal} />
          </ModalLayout>
        )}
      </KeywordListCreate>
      {/* Edit keyword list */}
      <KeywordListEdit>
        {openFormEdit && (
          <ModalLayout modal={openFormEdit}>
            {keywordList ? (
              <KeywordListForm
                title="Edit keyword list"
                toggle={onToggleModalEdit}
                keywordList={keywordList}
                isEdit
              />
            ) : (
              <div>Loading...</div>
            )}
          </ModalLayout>
        )}
      </KeywordListEdit>
      {showDialog && (
        <DialogConfirm
          open={showDialog}
          title="Are you sure delete this Domain?"
          handleClose={onCancelDelete}
          handleAgree={onSubmitDelete}
          isLoading={isLoadingDelete}
        />
      )}
    </>
  );
};

KeywordList.propTypes = propTypes;

export default KeywordList;
