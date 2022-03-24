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
import TrackerTemplateForm from './components/tracker-template.form';
import TrackerTemplateCreate from './TrackerTemplateCreate';
import TrackerTemplateEdit from './TrackerTemplateEdit';
import {
  useDeleteTrackerTemplate,
  useGetTrackerTemplate,
  useGetTrackerTemplates
} from 'queries/tracker-template';
import {TrackerTemplateTypes} from './constant';
import {formatValue} from 'react-currency-input-field';
import * as HandleCurrencyFields from 'utils/handleCurrencyFields';

const propTypes = {};

const TrackerTemplateList = () => {
  const {t} = useTranslation();
  const reduxDispatch = useDispatch();

  React.useEffect(() => {
    reduxDispatch(setEnableClosedSidebar(false));
  }, [reduxDispatch]);

  //---> Define local states.
  const [currentTrackerTemplate, setCurrentTrackerTemplate] = React.useState(
    null
  );

  const [showDialog, setShowDialog] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const [openFormEdit, setOpenFormEdit] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

  //---> Query get list of Tracker Template.
  const {data, isLoading, isPreviousData} = useGetTrackerTemplates({
    params: {
      limit: DEFAULT_PAGINATION.perPage,
      page: currentPage,
      sort: 'created_at DESC'
    },
    enabled: true,
    keepPreviousData: true
  });

  const trackerTemplates = useMemo(() => {
    const dataDestructured = getResponseData(data, IS_RESPONSE_ALL);
    return dataDestructured?.map(item => ({...item, id: item?.uuid}));
  }, [data]);
  const paginationInfo = React.useMemo(() => {
    return getResponsePagination(data);
  }, [data]);

  //---> Mutation delete Tracker Template
  const {
    mutateAsync: deleteTrackerTemplate,
    isLoading: isLoadingDelete
  } = useDeleteTrackerTemplate();

  const {data: trackerTemplate} = useGetTrackerTemplate({
    trackTempId: currentTrackerTemplate?.uuid,
    enabled: !!currentTrackerTemplate?.uuid
  });

  //---> Define columns
  const columns = useMemo(() => {
    return [
      {
        header: 'Name',
        accessor: 'name'
      },
      {
        header: 'Type',
        accessor: 'type',
        cell: row => {
          return (
            <Badge
              color={
                row?.value === TrackerTemplateTypes.DEFAULT
                  ? 'primary'
                  : 'success'
              }
            >
              {row?.value}
            </Badge>
          );
        }
      },
      {
        header: 'Price',
        accessor: 'price',
        cell: row => {
          return (
            <Badge color="info">
              {row?.value
                ? formatValue({
                    value: HandleCurrencyFields.convertApiToGui({
                      value: row?.value
                    })?.toString(),
                    groupSeparator: ',',
                    decimalSeparator: '.',
                    prefix: '$'
                  })
                : ''}
            </Badge>
          );
        }
      },
      {
        accessor: 'status',
        cell: row => {
          let statusProps = {
            label: row?.value ? capitalize(row.value) : 'inactive'
          };
          switch (row.value) {
            case 'active':
              statusProps.color = 'success';
              break;
            default:
              statusProps.color = 'danger';
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
    setCurrentTrackerTemplate(data);
    setOpenFormEdit(true);
  };

  const onClickDelete = (actionIndex, item) => {
    setShowDialog(true);
    setCurrentTrackerTemplate(item);
  };

  const onCancelDelete = () => {
    setShowDialog(false);
  };

  const onSubmitDelete = async () => {
    try {
      await deleteTrackerTemplate({
        trackTempId: currentTrackerTemplate?.uuid
      });
      ShowToast.success('Deleted tracker template successfully');
    } catch (err) {
      ShowToast.error(err || 'Fail to delete tracker template');
    } finally {
      setShowDialog(false);
    }
  };

  return (
    <>
      <AppContent>
        <PageTitleAlt
          heading={t('manageTrackerTemplate')}
          subheading=""
          icon="pe-7s-map-2 icon-gradient bg-tempting-azure"
        />
        <Container fluid>
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardHeader
                  style={{display: 'flex', justifyContent: 'space-between'}}
                >
                  <div>{t('trackerTemplateList')}</div>
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
                      data={trackerTemplates || []}
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
      {/* Create tracker template */}
      <TrackerTemplateCreate>
        {openForm && (
          <ModalLayout modal={openForm}>
            <TrackerTemplateForm toggle={onToggleModal} />
          </ModalLayout>
        )}
      </TrackerTemplateCreate>
      {/* Edit tracker template */}
      <TrackerTemplateEdit>
        {openFormEdit && (
          <ModalLayout modal={openFormEdit}>
            {trackerTemplate ? (
              <TrackerTemplateForm
                title="Edit Tracker Template"
                toggle={onToggleModalEdit}
                trackerTemplate={trackerTemplate}
                isEdit
              />
            ) : (
              <div>Loading...</div>
            )}
          </ModalLayout>
        )}
      </TrackerTemplateEdit>
      {showDialog && (
        <DialogConfirm
          open={showDialog}
          title="Are you sure delete this Tracker Template?"
          handleClose={onCancelDelete}
          handleAgree={onSubmitDelete}
          isLoading={isLoadingDelete}
        />
      )}
    </>
  );
};

TrackerTemplateList.propTypes = propTypes;

export default TrackerTemplateList;
