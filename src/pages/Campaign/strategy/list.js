//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useNavigate} from 'react-router';
import PropTypes from 'prop-types';

//---> Internal Modules
import {DialogConfirm, LoadingIndicator} from 'components/common';
import {List} from 'components/list';
import {CustomStatus} from 'components/list/status';
import {useDeleteStrategy, useGetStrategiesInfinity} from 'queries/strategy';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {capitalize} from 'utils/helpers/string.helpers';
import {StrategyListStyled} from './styled';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {Pagination} from 'components/list/pagination';
import {RoutePaths} from 'constants/route-paths';
import {getResponseData} from 'utils/helpers/misc.helpers';
import NoDataAvailable from 'components/list/no-data';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

const DeleteTitle = 'Are you sure delete this Strategy?';

const propTypes = {
  campaignId: PropTypes.any,
  status: PropTypes.string,
  fromCampaignPage: PropTypes.bool
};

const StrategyList = ({
  campaignId = undefined,
  status = '',
  fromCampaignPage = false
}) => {
  const {t} = useTranslation();

  //---> Local states
  const [openDialog, setOpenDialog] = React.useState(false);
  const [currentStrategy, setCurrentStrategy] = React.useState(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  //--->
  const navigate = useNavigate();
  const {mutateAsync: deleteStrategy} = useDeleteStrategy();

  const params = {
    per_page: DEFAULT_PAGINATION.perPage,
    sort: 'created_at DESC'
  };

  if (status) {
    params.status = status;
  }

  if (campaignId && campaignId !== 'create') {
    params.campaign_uuid = campaignId;
  }
  const {
    data: {pages = []} = {},
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useGetStrategiesInfinity({
    params,
    enabled: true
  });

  const strategiesDestructure = React.useMemo(() => {
    return pages?.reduce((acc, page) => {
      const items = getResponseData(page, IS_RESPONSE_ALL);
      return [...acc, ...items];
    }, []);
  }, [pages]);

  const strategies = React.useMemo(() => {
    return strategiesDestructure?.map(item => {
      const campaignName = item?.campaign_name;
      const advertiserName = item?.advertiser_name;
      return {
        ...item,
        id: item?.uuid,
        campaign_name: campaignName,
        advertiser_name: advertiserName
      };
    });
  }, [strategiesDestructure]);

  //---> Define columns
  const columns = React.useMemo(() => {
    const statusCol = {
      accessor: 'status',
      xs: 2,
      md: 2,
      sm: 2,
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
    };
    const baseColumns = [
      {
        header: 'Strategy',
        accessor: 'name',
        xs: 3,
        md: 3,
        sm: 3
      }
    ];

    if (!fromCampaignPage) {
      return [
        {
          header: 'Advertiser',
          accessor: 'advertiser_name'
        },
        {
          header: 'Campaign',
          accessor: 'campaign_name'
        },
        ...baseColumns,
        ...[statusCol]
      ];
    }

    return [
      ...baseColumns,
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
        header: 'Type',
        accessor: 'strategy_type'
      },
      ...[statusCol]
    ];
  }, [fromCampaignPage, t]);

  function onClickItem(item) {
    setCurrentStrategy(item);
    navigate(
      `/${RoutePaths.CAMPAIGN}/${item?.campaign_uuid}/${RoutePaths.STRATEGY}/${item?.uuid}?advertiser_id=${item?.advertiser_uuid}`
    );
  }

  function onClickMenu(actionIndex, item) {
    if (actionIndex === 2) {
      setOpenDialog(true);
      setCurrentStrategy(item);
    } else if (actionIndex === 1) {
      navigate(
        `/${RoutePaths.CAMPAIGN}/${item?.campaign_uuid}/${RoutePaths.STRATEGY}/${item?.uuid}/${RoutePaths.EDIT}?advertiser_id=${item?.campaign?.advertiser_uuid}`
      );
    } else {
      navigate(
        `/${RoutePaths.CAMPAIGN}/${item?.campaign_uuid}/${RoutePaths.STRATEGY}/${item?.uuid}?advertiser_id=${item?.campaign?.advertiser_uuid}`
      );
    }
  }

  function onCancelDelete() {
    setOpenDialog(false);
  }

  async function onSubmitDelete() {
    //---> Delete campaign
    setIsDeleting(true);
    try {
      await deleteStrategy({straId: currentStrategy?.uuid});
      ShowToast.success('Deleted strategy successfully');
    } catch (err) {
      ShowToast.error(err?.msg || 'Fail to delete strategy');
    } finally {
      setIsDeleting(false);
      setOpenDialog(false);
    }
  }

  return (
    <>
      <StrategyListStyled>
        {isFetching && <LoadingIndicator />}
        {strategies?.length > 0 ? (
          <List
            data={strategies || []}
            columns={columns}
            showAction
            actions={['View', 'Edit', 'Delete']}
            handleAction={onClickMenu}
            handleClickItem={onClickItem}
          />
        ) : (
          <NoDataAvailable />
        )}

        {hasNextPage && (
          <Pagination
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        )}
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
