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
import {useDeleteDsp, useGetDspsInfinity} from 'queries/dsp';
import TagsList from 'components/list/tags/tags';
import DialogConfirm from 'components/common/DialogConfirm';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {DEFAULT_PAGINATION} from 'constants/misc';
import {Pagination} from 'components/list/pagination';

const DspList = () => {
  const {t} = useTranslation();

  //---> Define local states.
  const [openForm, setOpenForm] = React.useState(false);
  const [openFormEdit, setOpenFormEdit] = React.useState(false);
  const [currentDsp, setCurrentDsp] = React.useState(null);
  const [showDialog, setShowDialog] = React.useState(false);

  //---> QUery get list of DSP.
  const {
    data: {pages = []} = {},
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useGetDspsInfinity({
    params: {
      limit: DEFAULT_PAGINATION.perPage
    },
    enabled: true
  });

  const dsps = React.useMemo(() => {
    return pages?.reduce((acc, item) => {
      const {items = []} = item;
      return [...acc, ...items];
    }, []);
  }, [pages]);

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
        header: 'Url',
        accessor: 'url',
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
    setCurrentDsp(data);
    setOpenFormEdit(true);
  };

  //---> BEGIN: Handle delete
  const onClickDelete = (actionIndex, item) => {
    setCurrentDsp(item);
    setShowDialog(true);
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
                  <div>{t('dspList')}</div>
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
                    data={dsps || []}
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
