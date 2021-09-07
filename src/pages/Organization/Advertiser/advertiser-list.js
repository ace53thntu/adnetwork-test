import React, {useMemo} from 'react';
import {capitalize} from 'utils/helpers/string.helpers';
import {useDeleteAdvertiser, useGetAdvertisers} from 'queries/advertiser';
import AppContent from 'components/layouts/Admin/components/AppContent';
import {PageTitleAlt} from 'components/layouts/Admin/components';
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

const ListAdvertiser = () => {
  const {t} = useTranslation();

  //---> Define local states.
  const [openForm, setOpenForm] = React.useState(false);
  const [openFormEdit, setOpenFormEdit] = React.useState(false);
  const [currentAdvertiser, setCurrentAdvertiser] = React.useState(null);
  const [showDialog, setShowDialog] = React.useState(false);

  //---> Query get list of advertisers.
  const {data: advertisersRes, isLoading} = useGetAdvertisers();
  const advertisers = useMemo(() => {
    return advertisersRes?.items?.map(item => {
      return {...item, id: item.uuid};
    });
  }, [advertisersRes?.items]);

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
                {isLoading && <LoadingIndicator />}

                <CardHeader
                  style={{display: 'flex', justifyContent: 'space-between'}}
                >
                  <div>{t('advertiser')}</div>
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
                    data={advertisers || []}
                    columns={columns}
                    showAction
                    actions={['Delete']}
                    handleAction={onClickDelete}
                    handleClickItem={onClickItem}
                  />
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
