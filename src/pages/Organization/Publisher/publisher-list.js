//---> Build-in Modules
import React from 'react';

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
import moment from 'moment';

//---> Internal Modules
import {capitalize} from 'utils/helpers/string.helpers';
import AppContent from 'components/layouts/Admin/components/AppContent';
import {PageTitleAlt} from 'components/layouts/Admin/components';
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

const PublisherList = () => {
  const {t} = useTranslation();
  const [openForm, setOpenForm] = React.useState(false);
  const [openFormEdit, setOpenFormEdit] = React.useState(false);
  const [currentPublisher, setCurrentPublisher] = React.useState(null);
  const [showDialog, setShowDialog] = React.useState(false);
  const {data: publishersRes, isLoading} = useGetPublishers();
  const publishers = React.useMemo(() => {
    return publishersRes?.items?.map(item => {
      return {...item, id: item.uuid};
    });
  }, [publishersRes?.items]);
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
        header: 'Status',
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

  return (
    <>
      <AppContent>
        <PageTitleAlt
          heading={t('publisher')}
          subheading={t('managementSegmentDescription')}
          icon="pe-7s-plane icon-gradient bg-tempting-azure"
        />
        <Container fluid>
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                {isLoading && <LoadingIndicator />}

                <CardHeader
                  style={{display: 'flex', justifyContent: 'space-between'}}
                >
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </AppContent>
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
    </>
  );
};

export default PublisherList;
