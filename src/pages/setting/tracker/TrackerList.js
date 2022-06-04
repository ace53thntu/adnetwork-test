import {ApiError} from 'components/common';
import CustomPagination from 'components/common/CustomPagination';
import DialogConfirm from 'components/common/DialogConfirm';
import LoadingIndicator from 'components/common/LoadingIndicator';
import {ModalLayout} from 'components/forms';
//---> Internal Modules
import {PageTitleAlt} from 'components/layouts/Admin/components';
import AppContent from 'components/layouts/Admin/components/AppContent';
import {List} from 'components/list';
import Status from 'components/list/status';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import moment from 'moment';
import {useDeleteTracker, useGetTracker, useGetTrackers} from 'queries/tracker';
//---> Build-in Modules
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
//---> External Modules
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row
} from 'reactstrap';
import {
  getResponseData,
  getResponsePagination
} from 'utils/helpers/misc.helpers';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {capitalize} from 'utils/helpers/string.helpers';

import DomainCreate from './TrackerCreate';
import DomainEdit from './TrackerEdit';
import DomainForm from './components/tracker.form';
import TrackerForm from './components/tracker.form';
import {TrackerReferenceTypes} from './constant';

const propTypes = {};

const renderReferenceTypeColor = type => {
  switch (type) {
    case TrackerReferenceTypes.CREATIVE:
      return 'primary';
    case TrackerReferenceTypes.VIDEO:
      return 'success';
    case TrackerReferenceTypes.NATIVE_AD:
      return 'warning';
    case TrackerReferenceTypes.INVENTORY:
      return 'info';
    default:
      return 'secondary';
  }
};

const TrackerList = () => {
  const {t} = useTranslation();

  //---> Define local states.
  const [currentTracker, setCurrentTracker] = React.useState(null);
  const [showDialog, setShowDialog] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const [openFormEdit, setOpenFormEdit] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

  //---> Query get list of Trackers.
  const {data, isLoading, isPreviousData} = useGetTrackers({
    params: {
      limit: DEFAULT_PAGINATION.perPage,
      page: currentPage,
      sort: 'created_at DESC'
    },
    enabled: true,
    keepPreviousData: true
  });

  const trackers = useMemo(() => {
    const dataDestructured = getResponseData(data, IS_RESPONSE_ALL);
    return dataDestructured?.map(item => ({...item, id: item?.uuid}));
  }, [data]);
  const paginationInfo = React.useMemo(() => {
    return getResponsePagination(data);
  }, [data]);

  //---> Mutation delete tracker
  const {
    mutateAsync: deleteTracker,
    isLoading: isLoadingDelete
  } = useDeleteTracker();

  const {data: tracker} = useGetTracker({
    trackerId: currentTracker?.uuid,
    enabled: !!currentTracker?.uuid
  });

  //---> Define columns
  const columns = useMemo(() => {
    return [
      {
        header: t('trackerTemplate'),
        accessor: 'tracker_template',
        cell: row => row?.value?.name
      },
      {
        header: t('referenceType'),
        accessor: 'reference_type',
        cell: row => (
          <Badge color={renderReferenceTypeColor(row?.value)}>
            {row?.value}
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
              statusProps.color = 'secondary';
              break;
          }
          return <Status {...statusProps} />;
        }
      },
      {
        header: 'Updated at',
        accessor: 'updated_at',
        cell: row => moment(row?.value).format('DD/MM/YYYY')
      }
    ];
  }, [t]);

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
    setCurrentTracker(data);
    setOpenFormEdit(true);
  };

  const onClickDelete = (actionIndex, item) => {
    setShowDialog(true);
    setCurrentTracker(item);
  };

  const onCancelDelete = () => {
    setShowDialog(false);
  };

  const onSubmitDelete = async () => {
    try {
      await deleteTracker({trackerId: currentTracker?.uuid});
      ShowToast.success('Deleted tracker successfully');
    } catch (err) {
      ShowToast.error(<ApiError apiError={err} />);
    } finally {
      setShowDialog(false);
    }
  };

  return (
    <>
      <AppContent>
        <PageTitleAlt
          heading={t('manageTracker')}
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
                  <div>{t('trackerList')}</div>
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
                      data={trackers || []}
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
      {/* Create tracker */}
      <DomainCreate>
        {openForm && (
          <ModalLayout modal={openForm}>
            <DomainForm toggle={onToggleModal} />
          </ModalLayout>
        )}
      </DomainCreate>
      {/* Edit tracker */}
      <DomainEdit>
        {openFormEdit && (
          <ModalLayout modal={openFormEdit}>
            {tracker ? (
              <TrackerForm
                title="Edit tracker"
                toggle={onToggleModalEdit}
                tracker={tracker}
                isEdit
              />
            ) : (
              <div>Loading...</div>
            )}
          </ModalLayout>
        )}
      </DomainEdit>
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

TrackerList.propTypes = propTypes;

export default TrackerList;
