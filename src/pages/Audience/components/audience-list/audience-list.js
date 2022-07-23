//---> Build-in Modules
import React from 'react';

//---> External Modules
import moment from 'moment';
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

//---> Internal Modules
import {List} from 'components/list';
import {DEFAULT_PAGINATION} from 'constants/misc';
import {RoutePaths} from 'constants/route-paths';
import {LoadingIndicator} from 'components/common';
import CustomPagination from 'components/common/CustomPagination';
import {getResponsePagination} from 'utils/helpers/misc.helpers';
import {AudienceActivation} from '../audience-activation';
import ActionBar from './action-bar';
import {BodyContentStyled, NoAudienceStyled} from './styled';
import {useDestructureAudiences} from 'pages/Audience/hooks';
import {useGetAudiences} from 'queries/audience';

const ActionIndexes = {
  VIEW: 0,
  DELETE: 1
};

const AudienceList = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = React.useState(false);

  const [currentPage, setCurrentPage] = React.useState(1);
  const params = {
    per_page: DEFAULT_PAGINATION.perPage,
    page: currentPage,
    sort: 'created_at DESC'
  };

  const {data, isLoading, isPreviousData} = useGetAudiences({
    params,
    enabled: true,
    keepPreviousData: true
  });

  const paginationInfo = React.useMemo(() => {
    return getResponsePagination(data);
  }, [data]);
  const audiences = useDestructureAudiences({data});

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

  function onPageChange(evt, page) {
    evt.preventDefault();
    setCurrentPage(page);
  }

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
        {isLoading && <LoadingIndicator />}
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
        <CustomPagination
          currentPage={currentPage}
          totalCount={paginationInfo?.totalItems}
          onPageChange={(evt, page) => onPageChange(evt, page)}
          disabled={isPreviousData}
        />
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
