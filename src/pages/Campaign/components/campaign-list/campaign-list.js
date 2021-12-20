import {DialogConfirm, LoadingIndicator} from 'components/common';
import {List} from 'components/list';
import Status from 'components/list/status';
import {useDeleteCampaign, useGetCampaigns} from 'queries/campaign';
import React from 'react';
import {useNavigate} from 'react-router';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {capitalize} from 'utils/helpers/string.helpers';
import {CampaignListStyled} from '../../campaign-management/styled';

const DeleteTitle = 'Are you sure delete this Campaign';

const propTypes = {};

const CampaignList = () => {
  const navigate = useNavigate();
  const {data: {items = []} = {}, isFetching} = useGetCampaigns();
  const campaigns = React.useMemo(() => {
    return items?.map(item => ({...item, id: item?.uuid}));
  }, [items]);
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
          return <Status {...statusProps} />;
        }
      }
    ];
  }, []);

  function onClickItem(item) {
    setCurrentCampaign(item);
    navigate(`/campaigns/${item?.uuid}`);
  }

  function onClickDelete(actionIndex, item) {
    if (actionIndex === 2) {
      // Delete campaign
      setOpenDialog(true);
      setCurrentCampaign(item);
    } else if (actionIndex === 1) {
      // Go to edit
      navigate(`/campaigns/${item?.uuid}/edit`);
    } else {
      // Go to view
      navigate(`/campaigns/${item?.uuid}`);
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
      ShowToast.error(err?.message || 'Fail to detele Campaign');
    } finally {
      setIsDeleting(false);
      setOpenDialog(false);
    }
  }

  return (
    <>
      <CampaignListStyled>
        {isFetching && <LoadingIndicator />}
        <List
          data={campaigns || []}
          columns={columns}
          showAction
          actions={['View', 'Edit', 'Delete']}
          handleAction={onClickDelete}
          handleClickItem={onClickItem}
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
