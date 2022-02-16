import {DialogConfirm, LoadingIndicator} from 'components/common';
import CustomPagination from 'components/common/CustomPagination';
import {List} from 'components/list';
import {CustomStatus} from 'components/list/status';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {RoutePaths} from 'constants/route-paths';
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

const DeleteTitle = 'Are you sure delete this Campaign';

const propTypes = {};

const CampaignList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = React.useState(1);

  const {data, isLoading, isPreviousData} = useGetCampaigns({
    params: {
      per_page: DEFAULT_PAGINATION.perPage,
      page: currentPage,
      sort: 'created_at DESC'
    },
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
    return [
      {
        header: 'Advertiser',
        accessor: 'advertiser_name'
      },
      {
        header: 'Campaign',
        accessor: 'name'
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
          return <CustomStatus {...statusProps} />;
        }
      }
    ];
  }, []);

  function onPageChange(evt, page) {
    evt.preventDefault();
    setCurrentPage(page);
  }

  function onClickItem(item) {
    setCurrentCampaign(item);
    navigate(`/${RoutePaths.CAMPAIGN}/${item?.uuid}`);
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
      ShowToast.error(err?.message || 'Fail to delete Campaign');
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
