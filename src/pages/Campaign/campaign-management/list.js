import {ApiError, DialogConfirm, LoadingIndicator} from 'components/common';
import CustomPagination from 'components/common/CustomPagination';
import {List} from 'components/list';
import {CustomStatus} from 'components/list/status';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {RoutePaths} from 'constants/route-paths';
import {useQueryString} from 'hooks';
import {useDeleteCampaign, useGetCampaigns} from 'queries/campaign';
import React from 'react';
import {useNavigate} from 'react-router';
import {
  getResponseData,
  getResponsePagination
} from 'utils/helpers/misc.helpers';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {capitalize} from 'utils/helpers/string.helpers';
import {CampaignListStyled} from './styled';
import moment from 'moment';
import {useTranslation} from 'react-i18next';

const DeleteTitle = 'Are you sure delete this Campaign';

const propTypes = {};

const CampaignList = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const query = useQueryString();
  const advertiserId = query.get('advertiser_id') || '';

  const [currentPage, setCurrentPage] = React.useState(1);
  const params = {
    per_page: DEFAULT_PAGINATION.perPage,
    page: currentPage,
    sort: 'created_at DESC'
  };

  if (advertiserId) {
    params.advertiser_uuid = advertiserId;
  }

  const {data, isLoading, isPreviousData} = useGetCampaigns({
    params,
    enabled: true,
    keepPreviousData: true
  });

  const campaigns = React.useMemo(() => {
    const dataDestructured = getResponseData(data, IS_RESPONSE_ALL);
    return dataDestructured?.map(item => ({...item, id: item?.uuid}));
  }, [data]);
  const paginationInfo = React.useMemo(() => {
    return getResponsePagination(data);
  }, [data]);
  const {mutateAsync: deleteCampaign} = useDeleteCampaign();

  const [openDialog, setOpenDialog] = React.useState(false);
  const [currentCampaign, setCurrentCampaign] = React.useState(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  //---> Define columns
  const columns = React.useMemo(() => {
    const baseCols = [
      {
        header: 'Campaign',
        accessor: 'name'
      },
      {
        header: t('startDate'),
        accessor: 'start_time',
        cell: row => (row?.value ? moment(row?.value).format('DD/MM/YYYY') : '')
      },
      {
        header: t('endDate'),
        accessor: 'end_time',
        cell: row => (row?.value ? moment(row?.value).format('DD/MM/YYYY') : '')
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
      }
    ];

    if (!advertiserId) {
      return [
        {
          header: 'Advertiser',
          accessor: 'advertiser_name'
        },
        ...baseCols
      ];
    }

    return baseCols;
  }, [advertiserId, t]);

  function onPageChange(evt, page) {
    evt.preventDefault();
    setCurrentPage(page);
  }

  function onClickItem(item) {
    setCurrentCampaign(item);
    navigate(`/${RoutePaths.CAMPAIGN}/${item?.uuid}?advertiser_id=${item?.advertiser_uuid}`);
  }

  function onClickDelete(actionIndex, item) {
    if (actionIndex === 2) {
      // Delete campaign
      setOpenDialog(true);
      setCurrentCampaign(item);
    } else if (actionIndex === 1) {
      // Go to edit
      navigate(`/${RoutePaths.CAMPAIGN}/${item?.uuid}/${RoutePaths.EDIT}`);
    } else {
      // Go to view
      navigate(`/${RoutePaths.CAMPAIGN}/${item?.uuid}`);
    }
  }

  function onCancelDelete() {
    setOpenDialog(false);
  }

  async function onSubmitDelete() {
    //---> Delete campaign
    setIsDeleting(true);
    try {
      await deleteCampaign({cid: currentCampaign?.uuid});
      ShowToast.success('Deleted campaign successfully');
    } catch (err) {
      ShowToast.error(<ApiError apiError={err || 'Fail to delete Campaign'} />);
    } finally {
      setIsDeleting(false);
      setOpenDialog(false);
    }
  }

  return (
    <>
      <CampaignListStyled>
        {isLoading && <LoadingIndicator />}
        <List
          data={campaigns || []}
          columns={columns}
          showAction
          actions={['View', 'Edit', 'Delete']}
          handleAction={onClickDelete}
          handleClickItem={onClickItem}
        />
        <CustomPagination
          currentPage={currentPage}
          totalCount={paginationInfo?.totalItems}
          onPageChange={(evt, page) => onPageChange(evt, page)}
          disabled={isPreviousData}
        />
      </CampaignListStyled>
      {openDialog && (
        <DialogConfirm
          open={openDialog}
          title={DeleteTitle}
          handleClose={onCancelDelete}
          handleAgree={onSubmitDelete}
          isLoading={isDeleting}
        />
      )}
    </>
  );
};

CampaignList.propTypes = propTypes;

export default CampaignList;
