//---> Build-in Modules
import React from 'react';

//---> External Modules
import moment from 'moment';
import {
  Badge,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button
} from 'reactstrap';

//---> Internal Modules
import {List} from 'components/list';
import {Pagination} from 'components/list/pagination';
import Status from 'components/list/status';
import {useGetAudiencesInfinity} from 'queries/audience';
import {AUDIENCES_INFINITY} from 'queries/audience/constants';
import {capitalize} from 'utils/helpers/string.helpers';
import {useDestructureAudiences} from 'pages/Audience/hooks';
import {BodyContentStyled, NoAudienceStyled} from './styled';
import {LoadingIndicator} from 'components/common';
import ActionBar from './action-bar';
import {useNavigate} from 'react-router';
import {AudienceActivation} from '../audience-activation';
import {useTranslation} from 'react-i18next';

const getStatus = ({row, statusProps}) => {
  switch (row.value) {
    case 'active':
      statusProps.color = 'success';
      break;
    case 'pending':
      statusProps.color = 'warning';
      break;
    case 'completed':
      statusProps.color = 'info';
      break;
    default:
      statusProps.color = 'secondary';
      break;
  }

  return statusProps;
};

const ActionIndexs = {
  VIEW: 0,
  DELETE: 1
};

const AudienceList = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = React.useState(false);

  const {
    data: {pages = []} = {},
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useGetAudiencesInfinity({
    enabled: true,
    key: AUDIENCES_INFINITY
  });

  const audiences = useDestructureAudiences({pages});

  //---> Define columns
  const columns = React.useMemo(() => {
    return [
      {
        header: 'Role',
        accessor: 'role'
      },
      {
        header: 'Name',
        accessor: 'name'
      },
      {
        header: 'Audience Type',
        accessor: 'audience_type'
      },
      {
        header: 'Send Code',
        accessor: 'send_code',
        cell: row => {
          return row?.value ? <code>{row.value}</code> : null;
        }
      },
      {
        header: 'Vendor Code',
        accessor: 'vendor_code',
        cell: row => {
          return row?.value ? <Badge>{row.value}</Badge> : null;
        }
      },
      {
        accessor: 'status',
        cell: row => {
          let statusProps = {
            label: row.value ? capitalize(row.value) : 'Unknown'
          };
          statusProps = getStatus({row, statusProps});
          return <Status {...statusProps} noHeader />;
        }
      },
      {
        header: 'Start Date',
        accessor: 'start_date',
        cell: row => {
          return row.value ? (
            <code>{moment(row.value).format('DD/MM/YYYY')}</code>
          ) : null;
        }
      },
      {
        header: 'Last Transfer Date',
        accessor: 'last_transfer_date',
        cell: row => {
          return row.value ? (
            <code>{moment(row.value).format('DD/MM/YYYY')}</code>
          ) : null;
        }
      }
    ];
  }, []);

  function onClickItem(item) {
    navigate(`/audiences/${item?.uuid}`);
  }

  function onClickAction(actionIndex, item) {
    if (actionIndex === ActionIndexs.VIEW) {
      navigate(`/audiences/${item?.uuid}`);
    }
  }

  function onToggleModal() {
    setOpenModal(prevState => !prevState);
  }

  return (
    <>
      <ActionBar onClickActivation={onToggleModal} />
      <BodyContentStyled>
        {isFetching && <LoadingIndicator />}
        {audiences?.length > 0 ? (
          <List
            showAction
            data={audiences}
            columns={columns}
            actions={['View']}
            handleClickItem={onClickItem}
            handleAction={(actionIndex, currentItem) =>
              onClickAction(actionIndex, currentItem)
            }
          />
        ) : (
          <NoAudienceStyled>No data available</NoAudienceStyled>
        )}
        {hasNextPage && (
          <Pagination
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        )}
      </BodyContentStyled>

      {/* Activation Modal */}
      {openModal && (
        <Modal isOpen={openModal} size="lg">
          <ModalHeader>Activation</ModalHeader>
          <ModalBody>
            <AudienceActivation />
          </ModalBody>
          <ModalFooter>
            <Button type="button" onClick={onToggleModal} color="link">
              {t('cancel')}
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default AudienceList;
