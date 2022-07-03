import {LoadingIndicator} from 'components/common';
//---> Internal Modules
import {List} from 'components/list';
import {Pagination} from 'components/list/pagination';
import {RoutePaths} from 'constants/route-paths';
//---> External Modules
import moment from 'moment';
import {useDestructureAudiences} from 'pages/Audience/hooks';
import {useGetAudiencesInfinity} from 'queries/audience';
import {AUDIENCES_INFINITY} from 'queries/audience/constants';
//---> Build-in Modules
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router';
import {
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';

import {AudienceActivation} from '../audience-activation';
import ActionBar from './action-bar';
import {BodyContentStyled, NoAudienceStyled} from './styled';

const ActionIndexes = {
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
        accessor: 'audience_name'
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
    navigate(`/${RoutePaths.AUDIENCE}/${item?.uuid}`);
  }

  function onClickAction(actionIndex, item) {
    if (actionIndex === ActionIndexes.VIEW) {
      navigate(`/${RoutePaths.AUDIENCE}/${item?.uuid}`);
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
