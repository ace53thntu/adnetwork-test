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
import {countries} from 'countries-list';

//---> Internal Modules
import {PageTitleAlt} from 'components/layouts/Admin/components';
import AppContent from 'components/layouts/Admin/components/AppContent';
import {List} from 'components/list';
import Status from 'components/list/status';
import LoadingIndicator from 'components/common/LoadingIndicator';
import DialogConfirm from 'components/common/DialogConfirm';
import {capitalize} from 'utils/helpers/string.helpers';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {useDeleteUser, useGetUsersInfinity} from 'queries/users';
import UserCreate from './user-create';
import UserEdit from './user-edit';
import {UserForm} from './components';
import {getUserRole} from './constants';
import {DEFAULT_PAGINATION} from 'constants/misc';
import {Pagination} from 'components/list/pagination';

const UserList = () => {
  const {t} = useTranslation();

  //---> Define local states.
  const [currentUser, setCurrentUser] = React.useState(null);
  const [showDialog, setShowDialog] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const [openFormEdit, setOpenFormEdit] = React.useState(false);

  //---> Query get list of Users.
  const {
    data: {pages = []} = {},
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useGetUsersInfinity({
    params: {
      limit: DEFAULT_PAGINATION.perPage
    },
    enabled: true
  });
  const users = React.useMemo(() => {
    return pages?.reduce((acc, item) => {
      const {items = []} = item;
      const userDestructure = items?.map(userItem => ({
        ...userItem,
        id: userItem?.uuid
      }));
      return [...acc, ...userDestructure];
    }, []);
  }, [pages]);

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
              statusProps.color = 'error';
              break;
          }
          return <Status {...statusProps} />;
        }
      },
      {
        header: 'Updated at',
        accessor: 'update_at',
        cell: row => moment(row?.value).format('DD/MM/YYYY')
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
      ShowToast.error(err || 'Fail to delete user');
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
                  <div>{t('userList')}</div>
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
                    data={users || []}
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
