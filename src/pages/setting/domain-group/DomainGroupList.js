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
import {
  useDeleteDomainGroup,
  useGetDomainGroup,
  useGetDomainGroups
} from 'queries/domain-group';
//---> Build-in Modules
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
//---> External Modules
import {
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

import DomainCreate from './DomainGroupCreate';
import DomainEdit from './DomainGroupEdit';
import DomainBadge from './components/DomainBadge';
import DomainForm from './components/domain-group.form';
import DomainGroupForm from './components/domain-group.form';

const propTypes = {};

const DomainGroupList = () => {
  const {t} = useTranslation();

  //---> Define local states.
  const [currentDomain, setCurrentDomain] = React.useState(null);
  const [showDialog, setShowDialog] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const [openFormEdit, setOpenFormEdit] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

  //---> Query get list of Domains.
  const {data, isLoading, isPreviousData} = useGetDomainGroups({
    params: {
      limit: DEFAULT_PAGINATION.perPage,
      page: currentPage,
      sort: 'created_at DESC'
    },
    enabled: true,
    keepPreviousData: true
  });

  const domains = useMemo(() => {
    const dataDestructured = getResponseData(data, IS_RESPONSE_ALL);
    return dataDestructured?.map(item => ({...item, id: item?.uuid}));
  }, [data]);
  const paginationInfo = React.useMemo(() => {
    return getResponsePagination(data);
  }, [data]);

  //---> Mutation delete domain
  const {
    mutateAsync: deleteDomainGroup,
    isLoading: isLoadingDelete
  } = useDeleteDomainGroup();

  const {data: domainGroup} = useGetDomainGroup({
    domainGroupId: currentDomain?.uuid,
    enabled: !!currentDomain?.uuid
  });

  //---> Define columns
  const columns = useMemo(() => {
    return [
      {
        header: 'Name',
        accessor: 'name'
      },
      {
        header: 'Domains',
        accessor: 'domain_list',
        cell: row => <DomainBadge domains={row?.value || []} />
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
    setCurrentDomain(data);
    setOpenFormEdit(true);
  };

  const onClickDelete = (actionIndex, item) => {
    setShowDialog(true);
    setCurrentDomain(item);
  };

  const onCancelDelete = () => {
    setShowDialog(false);
  };

  const onSubmitDelete = async () => {
    try {
      await deleteDomainGroup({domainGroupId: currentDomain?.uuid});
      ShowToast.success('Deleted domain group successfully');
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
          heading={t('manageDomainGroup')}
          subheading=""
          icon="pe-7s-global icon-gradient bg-tempting-azure"
        />
        <Container fluid>
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardHeader
                  style={{display: 'flex', justifyContent: 'space-between'}}
                >
                  <div>{t('domainList')}</div>
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
                      data={domains || []}
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
      {/* Create domain group */}
      <DomainCreate>
        {openForm && (
          <ModalLayout modal={openForm}>
            <DomainForm toggle={onToggleModal} />
          </ModalLayout>
        )}
      </DomainCreate>
      {/* Edit domain group */}
      <DomainEdit>
        {openFormEdit && (
          <ModalLayout modal={openFormEdit}>
            {domainGroup ? (
              <DomainGroupForm
                title="Edit domain group"
                toggle={onToggleModalEdit}
                domainGroup={domainGroup}
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
          title="Are you sure delete this Domain Group?"
          handleClose={onCancelDelete}
          handleAgree={onSubmitDelete}
          isLoading={isLoadingDelete}
        />
      )}
    </>
  );
};

DomainGroupList.propTypes = propTypes;

export default DomainGroupList;
