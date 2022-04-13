// Build-in Modules
import React, {useMemo} from 'react';

// External Modules
import {useDispatch} from 'react-redux';
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

// Internal Modules
import {capitalize} from 'utils/helpers/string.helpers';
import {useDeleteAdvertiser, useGetAdvertisers} from 'queries/advertiser';
import AppContent from 'components/layouts/Admin/components/AppContent';
import {PageTitleAlt} from 'components/layouts/Admin/components';
import {List} from 'components/list';
import Status from 'components/list/status';
import TagsList from 'components/list/tags/tags';
import AdvertiserCreate from './advertiser-create';
import AdvertiserEdit from './advertiser-edit';
import {AdvertiserForm} from './components';
import {useGetIABs} from 'queries/iabs';
import {useIABsOptions} from '../hooks';
import LoadingIndicator from 'components/common/LoadingIndicator';
import DialogConfirm from 'components/common/DialogConfirm';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {setEnableClosedSidebar} from 'store/reducers/ThemeOptions';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {
  getResponseData,
  getResponsePagination
} from 'utils/helpers/misc.helpers';
import CustomPagination from 'components/common/CustomPagination';
import {RoutePaths} from 'constants/route-paths';
import {useNavigate} from 'react-router-dom';
import {getRole} from 'utils/helpers/auth.helpers';
import {USER_ROLE} from 'pages/user-management/constants';
import SearchInput from './components/SearchInput';
import {useSearchTermSelector} from 'store/reducers/advertiser';
import NoDataAvailable from 'components/list/no-data';

/**
 * @function Advertiser List Component
 * @returns JSX
 */
const ListAdvertiser = () => {
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
  const [currentAdvertiser, setCurrentAdvertiser] = React.useState(null);
  const [showDialog, setShowDialog] = React.useState(false);

  const [currentPage, setCurrentPage] = React.useState(1);
  const searchTerm = useSearchTermSelector();

  //---> QUery get list of Advertiser.
  const {data, isFetching, isPreviousData} = useGetAdvertisers({
    params: {
      per_page: DEFAULT_PAGINATION.perPage,
      page: currentPage,
      sort: 'updated_at DESC',
      name: searchTerm
    },
    enabled: true,
    keepPreviousData: true
  });

  const advertisers = React.useMemo(() => {
    const dataDestructured = getResponseData(data, IS_RESPONSE_ALL);
    return dataDestructured?.map(item => ({...item, id: item?.uuid}));
  }, [data]);

  const paginationInfo = React.useMemo(() => {
    return getResponsePagination(data);
  }, [data]);

  //---> Get list of IABs.
  const {data: IABs} = useGetIABs();
  const IABsOptions = useIABsOptions({IABs});

  //---> Mutation delete a advertiser
  const {
    mutateAsync: deleteAdvertiser,
    isLoading: isLoadingDelete
  } = useDeleteAdvertiser();

  //---> Define columns
  const columns = useMemo(() => {
    return [
      {
        header: 'Name',
        accessor: 'name'
      },
      {
        header: 'IABs',
        accessor: 'iabs',
        cell: row => <TagsList tagsList={row?.value || []} />
      },
      {
        header: 'Domain',
        accessor: 'domains',
        cell: row => <TagsList tagsList={row?.value || []} />
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
    setCurrentAdvertiser(data);
    setOpenFormEdit(true);
  };

  const onClickDelete = (actionIndex, item) => {
    if (actionIndex === 0) {
      setCurrentAdvertiser(item);
      setOpenFormEdit(true);
    }
    if (actionIndex === 1) {
      navigate(
        `/${RoutePaths.ORGANIZATION}/${RoutePaths.ADVERTISER}/${item?.uuid}`
      );
      return;
    }

    if (actionIndex === 2) {
      setCurrentAdvertiser(item);
      setShowDialog(true);
      return;
    }
  };

  const onCancelDelete = () => {
    setShowDialog(false);
  };

  const onSubmitDelete = async () => {
    try {
      await deleteAdvertiser({advId: currentAdvertiser?.uuid});
      ShowToast.success('Delete advertiser successfully');
    } catch (err) {
      ShowToast.error(err || 'Fail to delete advertiser');
    } finally {
      setShowDialog(false);
    }
  };

  return (
    <>
      <AppContent>
        <PageTitleAlt
          heading={t('advertiser')}
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
                    <div className="mr-2">{t('advertiserList')}</div>
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
                  {advertisers?.length > 0 ? (
                    <>
                      <List
                        data={advertisers || []}
                        columns={columns}
                        showAction
                        actions={
                          [USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(role)
                            ? ['Edit', 'View', 'Delete']
                            : ['Edit']
                        }
                        handleAction={onClickDelete}
                        handleClickItem={onClickItem}
                      />
                      <CustomPagination
                        currentPage={currentPage}
                        totalCount={paginationInfo?.totalItems}
                        onPageChange={(evt, page) => onPageChange(evt, page)}
                        disabled={isPreviousData}
                      />
                    </>
                  ) : (
                    <NoDataAvailable />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </AppContent>
      {/* Advertiser Create */}
      <AdvertiserCreate>
        {openForm && (
          <AdvertiserForm
            modal={openForm}
            toggle={onToggleModal}
            IABsOptions={IABsOptions}
          />
        )}
      </AdvertiserCreate>
      {/* Advertiser Edit */}
      {openFormEdit && (
        <AdvertiserEdit
          modal={openFormEdit}
          toggle={onToggleModalEdit}
          IABsOptions={IABsOptions}
          title="Edit Advertiser"
          isEdit
          advertiserId={currentAdvertiser?.uuid}
        />
      )}

      {showDialog && (
        <DialogConfirm
          open={showDialog}
          title="Are you sure delete this Advertiser?"
          handleClose={onCancelDelete}
          handleAgree={onSubmitDelete}
          isLoading={isLoadingDelete}
        />
      )}
    </>
  );
};

export default ListAdvertiser;
