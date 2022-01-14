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
import {
  useDeleteAdvertiser,
  useGetAdvertisersInfinity
} from 'queries/advertiser';
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
import {Pagination} from 'components/list/pagination';
import {IS_RESPONSE_ALL} from 'constants/misc';
import {getResponseData} from 'utils/helpers/misc.helpers';

/**
 * @function Advertiser List Component
 * @returns JSX
 */
const ListAdvertiser = () => {
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

  //---> Query get list of advertisers.
  const {
    data: {pages = []} = {},
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useGetAdvertisersInfinity({enabled: true});

  const advertisers = React.useMemo(() => {
    return pages?.reduce((acc, page) => {
      const data = getResponseData(page, IS_RESPONSE_ALL);
      const dataDestructured = data?.map(item => ({...item, id: item?.uuid}));
      return [...acc, ...dataDestructured];
    }, []);
  }, [pages]);

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
              statusProps.color = 'error';
              break;
          }
          return <Status {...statusProps} />;
        }
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
    setCurrentAdvertiser(data);
    setOpenFormEdit(true);
  };

  const onClickDelete = (actionIndex, item) => {
    setShowDialog(true);
    setCurrentAdvertiser(item);
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
                  <div>{t('advertiserList')}</div>
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
                </CardHeader>
                <CardBody style={{minHeight: '400px'}}>
                  <List
                    data={advertisers || []}
                    columns={columns}
                    showAction
                    actions={['Delete']}
                    handleAction={onClickDelete}
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
      <AdvertiserEdit>
        {openFormEdit && (
          <AdvertiserForm
            modal={openFormEdit}
            toggle={onToggleModalEdit}
            IABsOptions={IABsOptions}
            title="Edit Advertiser"
            isEdit
            advertiserId={currentAdvertiser?.uuid}
          />
        )}
      </AdvertiserEdit>
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
