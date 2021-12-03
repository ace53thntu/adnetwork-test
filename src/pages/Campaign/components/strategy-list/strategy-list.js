//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useNavigate} from 'react-router';

//---> Internal Modules
import {DialogConfirm, LoadingIndicator} from 'components/common';
import {List} from 'components/list';
import Status from 'components/list/status';
import {useDeleteStrategy, useGetStrategies} from 'queries/strategy';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {capitalize} from 'utils/helpers/string.helpers';
import {StrategyListStyled} from './styled';

const DeleteTitle = 'Are you sure delete this Strategy?';

const propTypes = {};

const StrategyList = () => {
  const navigate = useNavigate();
  const {data: {items: strategies = []} = {}, isFetching} = useGetStrategies();
  const {mutateAsync: deleteStrategy} = useDeleteStrategy();

  const [openDialog, setOpenDialog] = React.useState(false);
  const [currentStrategy, setCurrentStrategy] = React.useState(null);
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
        accessor: 'campaign_name'
      },
      {
        header: 'Strategy',
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
    setCurrentStrategy(item);
    navigate(`/campaigns/${item?.campaign_uuid}/strategy/${item?.uuid}`);
  }

  function onClickDelete(actionIndex, item) {
    if (actionIndex === 2) {
      setOpenDialog(true);
      setCurrentStrategy(item);
    } else if (actionIndex === 1) {
      navigate(`/campaigns/${item?.campaign_uuid}/strategy/${item?.uuid}/edit`);
    } else {
      navigate(`/campaigns/${item?.campaign_uuid}/strategy/${item?.uuid}`);
    }
  }

  function onCancelDelete() {
    setOpenDialog(false);
  }

  async function onSubmitDelete() {
    //---> Delete campaign
    setIsDeleting(true);
    try {
      await deleteStrategy({cid: currentStrategy?.uuid});
      ShowToast.success('Deleted strategy successfully');
    } catch (err) {
      ShowToast.error(err?.message || 'Fail to detele strategy');
    } finally {
      setIsDeleting(false);
      setOpenDialog(false);
    }
  }

  return (
    <>
      <StrategyListStyled>
        {isFetching && <LoadingIndicator />}
        <List
          data={strategies || []}
          columns={columns}
          showAction
          actions={['View', 'Edit', 'Delete']}
          handleAction={onClickDelete}
          handleClickItem={onClickItem}
        />
      </StrategyListStyled>
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

StrategyList.propTypes = propTypes;

export default StrategyList;
