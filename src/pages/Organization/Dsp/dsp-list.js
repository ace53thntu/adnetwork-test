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
  Container
} from 'reactstrap';
import {useTranslation} from 'react-i18next';

//---> Internal Modules
import {capitalize} from 'utils/helpers/string.helpers';
import {PageTitleAlt} from 'components/layouts/Admin/components';
import AppContent from 'components/layouts/Admin/components/AppContent';
import {List} from 'components/list';
import Status from 'components/list/status';
import LoadingIndicator from 'components/common/LoadingIndicator';
import DspForm from './components/dsp.form';
import DspCreate from './dsp-create';
import DspEdit from './dsp-edit';
import {useDeleteDsp, useGetDsps} from 'queries/dsp';
import TagsList from 'components/list/tags/tags';
import DialogConfirm from 'components/common/DialogConfirm';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {RoutePaths} from 'constants/route-paths';
import {
  getResponseData,
  getResponsePagination
} from 'utils/helpers/misc.helpers';
import CustomPagination from 'components/common/CustomPagination';
import {USER_ROLE} from 'pages/user-management/constants';
import {getRole} from 'utils/helpers/auth.helpers';
import {useSearchTermSelector} from 'store/reducers/dsp';
import SearchInput from './components/SearchInput';

/**
 * @function DSP List Component
 * @returns JSX
 */
const DspList = () => {
  const role = getRole();

  const navigate = useNavigate();
  const {t} = useTranslation();
  const reduxDispatch = useDispatch();

  React.useEffect(() => {
    reduxDispatch(setEnableClosedSidebar(false));
  }, [reduxDispatch]);

  //---> Define local states.
  const [openForm, setOpenForm] = React.useState(false);
  const [openFormEdit, setOpenFormEdit] = React.useState(false);
  const [currentDsp, setCurrentDsp] = React.useState(null);
  const [showDialog, setShowDialog] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const searchTerm = useSearchTermSelector();

  //---> QUery get list of DSP.
  const {data, isFetching, isPreviousData} = useGetDsps({
    params: {
      per_page: DEFAULT_PAGINATION.perPage,
      page: currentPage,
      sort: 'created_at DESC',
      name: searchTerm
    },
    enabled: true,
    keepPreviousData: true
  });

  const dsps = React.useMemo(() => {
    const dataDestructured = getResponseData(data, IS_RESPONSE_ALL);
    return dataDestructured?.map(item => ({...item, id: item?.uuid}));
  }, [data]);

  const paginationInfo = React.useMemo(() => {
    return getResponsePagination(data);
  }, [data]);

  //---> Mutation delete a DSP
  const {mutateAsync: deleteDsp, isLoading: isLoadingDelete} = useDeleteDsp();

  //---> Define columns
  const columns = useMemo(() => {
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
        header: 'Bidding Url',
        accessor: 'bidding_url',
        cell: row => <div title={row?.value}>{row?.value}</div>
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
    setCurrentDsp(data);
    setOpenFormEdit(true);
  };

  //---> BEGIN: Handle delete
  const onClickMenu = (actionIndex, item) => {
    if (actionIndex === 0) {
      setCurrentDsp(item);
      setOpenFormEdit(true);
    }
    if (actionIndex === 1) {
      navigate(`/${RoutePaths.ORGANIZATION}/${RoutePaths.DSP}/${item?.uuid}`);
      return;
    }

    if (actionIndex === 2) {
      setCurrentDsp(item);
      setShowDialog(true);
      return;
    }
  };

  const onCancelDelete = () => {
    setShowDialog(false);
  };

  const onSubmitDelete = async () => {
    try {
      await deleteDsp({dspId: currentDsp?.uuid});
      ShowToast.success('Deleted DSP successfully');
    } catch (err) {
      ShowToast.error(err || 'Fail to delete DSP');
    } finally {
      setShowDialog(false);
    }
  };
  //---> END: Handle delete

  return (
    <>
      <AppContent>
        <PageTitleAlt
          heading={t('dsp')}
          subheading={t('managementSegmentDescription')}
          icon="pe-7s-plane icon-gradient bg-tempting-azure"
        />
        <Container fluid>
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                {isFetching && <LoadingIndicator />}

                <CardHeader
                  style={{display: 'flex', justifyContent: 'space-between'}}
                >
                  <div className="d-flex align-items-center">
                    <div className="mr-2">{t('dspList')}</div>
                    <SearchInput />
                  </div>
                  {[USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(role) && (
                    <div className="widget-content-right">
                      <Button
                        onClick={onClickAdd}
                        className="btn-icon btn-shadow"
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
                  <List
                    data={dsps || []}
                    columns={columns}
                    showAction
                    actions={
                      [USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(role)
                        ? ['Edit', 'View', 'Delete']
                        : ['Edit']
                    }
                    handleAction={onClickMenu}
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
            </Col>
          </Row>
        </Container>
      </AppContent>
      {/* DSP Create */}
      <DspCreate>
        {openForm && <DspForm modal={openForm} toggle={onToggleModal} />}
      </DspCreate>
      {/* DSP Edit */}
      {openFormEdit && (
        <DspEdit>
          <DspForm
            modal={openFormEdit}
            toggle={onToggleModalEdit}
            title="Edit DSP"
            isEdit
            dspId={currentDsp?.uuid}
          />
        </DspEdit>
      )}

      {showDialog && (
        <DialogConfirm
          open={showDialog}
          title="Are you sure delete this DSP?"
          handleClose={onCancelDelete}
          handleAgree={onSubmitDelete}
          isLoading={isLoadingDelete}
        />
      )}
    </>
  );
};

export default DspList;
