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
import {useGetDsps} from 'queries/dsp';
import TagsList from 'components/list/tags/tags';

const DspList = () => {
  const {t} = useTranslation();
  const [openForm, setOpenForm] = React.useState(false);
  const [openFormEdit, setOpenFormEdit] = React.useState(false);
  const [currentDsp, setCurrentDsp] = React.useState(null);
  const {data: dspResp, isLoading} = useGetDsps();
  const dsps = useMemo(() => {
    return dspResp?.items?.map(item => {
      return {...item, id: item.uuid};
    });
  }, [dspResp?.items]);

  //---> Define columns
  const columns = useMemo(() => {
    return [
      {
        header: 'Name',
        accessor: 'name'
      },
      {
        header: 'Domain',
        accessor: 'domains',
        cell: row => <TagsList tagsList={row?.value || []} />
      },
      {
        header: 'Url',
        accessor: 'url',
        cell: row => <div title={row?.value}>{row?.value}</div>
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
    setCurrentDsp(data?.uuid);
    setOpenFormEdit(true);
  };

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
                {isLoading && <LoadingIndicator />}

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
                    // handleAction={(actionIndex, item) => {
                    //   onHandleDelete(actionIndex, item);
                    // }}
                    handleClickItem={onClickItem}
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
      <DspEdit>
        <DspForm
          modal={openFormEdit}
          toggle={onToggleModalEdit}
          title="Edit DSP"
          isEdit
          dspId={currentDsp}
        />
      </DspEdit>
    </>
  );
};

export default DspList;
