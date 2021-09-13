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

//---> Internal Modules
import {PageTitleAlt} from 'components/layouts/Admin/components';
import AppContent from 'components/layouts/Admin/components/AppContent';
import {List} from 'components/list';
import Status from 'components/list/status';
import LoadingIndicator from 'components/common/LoadingIndicator';
import DialogConfirm from 'components/common/DialogConfirm';
import {capitalize} from 'utils/helpers/string.helpers';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {useDeleteUser, useGetUsers} from 'queries/users';

const UserList = () => {
  const {t} = useTranslation();

  //---> Define local states.
  const [currentUser, setCurrentUser] = React.useState(null);
  const [showDialog, setShowDialog] = React.useState(false);

  //---> Query get list of Users.
  const {data: userRes, isLoading} = useGetUsers();
  const users = useMemo(() => {
    return userRes?.items?.map(item => {
      return {...item, id: item.uuid};
    });
  }, [userRes?.items]);

  //---> Mutation delete user
  const {mutateAsync: deleteUser, isLoading: isLoadingDelete} = useDeleteUser();

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
        cell: row => <Badge color="light">{row?.value}</Badge>
      },
      {
        header: 'Role',
        accessor: 'role',
        cell: row => renderRole(row?.value)
      },
      {
        header: 'Organization',
        accessor: 'organization'
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

  const onClickAdd = evt => {
    evt.preventDefault();
  };

  const onClickItem = data => {
    setCurrentUser(data);
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
      await deleteUser({advId: currentUser?.uuid});
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
                {isLoading && <LoadingIndicator />}

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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </AppContent>

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
