import {ApiError} from 'components/common';
import CustomPagination from 'components/common/CustomPagination';
import DialogConfirm from 'components/common/DialogConfirm';
import LoadingIndicator from 'components/common/LoadingIndicator';
//---> Internal Modules
import {PageTitleAlt} from 'components/layouts/Admin/components';
import AppContent from 'components/layouts/Admin/components/AppContent';
import {List} from 'components/list';
import {CustomStatus} from 'components/list/status';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {countries} from 'countries-list';
import moment from 'moment';
import {useDeleteUser, useGetUsers} from 'queries/users';
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
import {useSearchTermSelector} from 'store/reducers/user';
import {
  getResponseData,
  getResponsePagination
} from 'utils/helpers/misc.helpers';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {capitalize} from 'utils/helpers/string.helpers';

import {UserForm} from './components';
import SearchInput from './components/SearchInput';
import {getUserRole} from './constants';
import UserCreate from './user-create';
import UserEdit from './user-edit';

const UserList = () => {
  const {t} = useTranslation();

  //---> Define local states.
  const [currentUser, setCurrentUser] = React.useState(null);
  const [showDialog, setShowDialog] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const [openFormEdit, setOpenFormEdit] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const searchTerm = useSearchTermSelector();

  //---> Query get list of Users.
  const {data, isLoading, isPreviousData} = useGetUsers({
    params: {
      limit: DEFAULT_PAGINATION.perPage,
      page: currentPage,
      sort: 'created_at DESC',
      username: searchTerm
    },
    enabled: true,
    keepPreviousData: true
  });

  const users = useMemo(() => {
    const dataDestructured = getResponseData(data, IS_RESPONSE_ALL);
    return dataDestructured?.map(item => ({...item, id: item?.uuid}));
  }, [data]);
  const paginationInfo = React.useMemo(() => {
    return getResponsePagination(data);
  }, [data]);

  //---> Mutation delete user
  const {mutateAsync: deleteUser, isLoading: isLoadingDelete} = useDeleteUser();

  //---> Get list data
  //---> Get user role options
  const userRoles = getUserRole();
  //---> Destructure list of Country Options.
  const countryOptions = React.useMemo(() => {
    const countriesArr = Object.values(countries);
    return countriesArr?.map(item => {
      return {...item, value: item.languages?.[0], label: item.name};
    });
  }, []);

  //---> Define columns
  const columns = useMemo(() => {
    return [
      {
        header: 'Username',
        accessor: 'username'
      },
      {
        header: 'Email',
        accessor: 'email',
        cell: row => (
          <div
            style={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }}
            title={row?.value}
          >
            <Badge color="light">{row?.value}</Badge>
          </div>
        )
      },
      {
        header: 'Role',
        accessor: 'role',
        cell: row => renderRole(row?.value)
      },
      {
        header: 'Company',
        accessor: 'company'
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
    setCurrentUser(data);
    setOpenFormEdit(true);
  };

  const onClickDelete = (actionIndex, item) => {
    setShowDialog(true);
    setCurrentUser(item);
  };

  const onCancelDelete = () => {
    setShowDialog(false);
  };

  const onSubmitDelete = async () => {
    try {
      await deleteUser({userId: currentUser?.uuid});
      ShowToast.success('Deleted user successfully');
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
          heading={t('user')}
          subheading={t('managementSegmentDescription')}
          icon="pe-7s-user icon-gradient bg-tempting-azure"
        />
        <Container fluid>
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardHeader
                  style={{display: 'flex', justifyContent: 'space-between'}}
                >
                  <div className="d-flex align-items-center">
                    <div className="mr-2">{t('userList')}</div>
                    <SearchInput />
                  </div>
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
                      data={users || []}
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
      {/* Create user */}
      <UserCreate>
        {openForm && (
          <UserForm
            modal={openForm}
            toggle={onToggleModal}
            userRoles={userRoles}
            countryOptions={countryOptions}
          />
        )}
      </UserCreate>
      {/* Edit user */}
      <UserEdit>
        {openFormEdit && (
          <UserForm
            modal={openFormEdit}
            toggle={onToggleModalEdit}
            title="Edit User"
            isEdit
            userId={currentUser?.uuid}
            userRoles={userRoles}
            countryOptions={countryOptions}
          />
        )}
      </UserEdit>
      {showDialog && (
        <DialogConfirm
          open={showDialog}
          title="Are you sure delete this User?"
          handleClose={onCancelDelete}
          handleAgree={onSubmitDelete}
          isLoading={isLoadingDelete}
        />
      )}
    </>
  );
};

const renderRole = role => {
  let badgeColor = '';
  switch (role) {
    case 'admin':
      badgeColor = 'info';
      break;
    case 'manager':
      badgeColor = 'warning';
      break;
    case 'dsp':
      badgeColor = 'primary';
      break;
    case 'advertiser':
      badgeColor = 'success';
      break;
    case 'publisher':
      badgeColor = 'secondary';
      break;
    default:
      break;
  }

  return <Badge color={badgeColor}>{role}</Badge>;
};

export default UserList;
