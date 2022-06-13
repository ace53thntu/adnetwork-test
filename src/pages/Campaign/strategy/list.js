//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useNavigate} from 'react-router';
import PropTypes from 'prop-types';

//---> Internal Modules
import {ApiError, DialogConfirm, LoadingIndicator} from 'components/common';
import {List} from 'components/list';
import {CustomStatus} from 'components/list/status';
import {useDeleteStrategy, useGetStrategies} from 'queries/strategy';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {capitalize} from 'utils/helpers/string.helpers';
import {StrategyListStyled} from './styled';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {RoutePaths} from 'constants/route-paths';
import {
  getResponseData,
  getResponsePagination
} from 'utils/helpers/misc.helpers';
import NoDataAvailable from 'components/list/no-data';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import CustomPagination from 'components/common/CustomPagination';

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
  const [currentPage, setCurrentPage] = React.useState(DEFAULT_PAGINATION.page);

  //--->
  const navigate = useNavigate();
  const {mutateAsync: deleteStrategy} = useDeleteStrategy();

  const params = {
    per_page: DEFAULT_PAGINATION.perPage,
    page: currentPage,
    sort: 'created_at DESC'
  };

  if (status) {
    params.status = status;
  }

  if (campaignId && campaignId !== 'create') {
    params.campaign_uuid = campaignId;
  }
  const {data, isLoading, isPreviousData} = useGetStrategies({
    params,
    enabled: true,
    keepPreviousData: true
  });

  const strategies = React.useMemo(() => {
    const dataDestructured = getResponseData(data, IS_RESPONSE_ALL);
    return dataDestructured?.map(item => {
      const campaignName = item?.campaign_name;
      const advertiserName = item?.advertiser_name;
      return {
        ...item,
        id: item?.uuid,
        campaign_name: campaignName,
        advertiser_name: advertiserName
      };
    });
  }, [data]);
  const paginationInfo = React.useMemo(() => {
    return getResponsePagination(data);
  }, [data]);

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
            statusProps.color = 'secondary';
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

  function onPageChange(evt, page) {
    evt.preventDefault();
    setCurrentPage(page);
  }

  function onClickItem(item) {
    setCurrentStrategy(item);
    navigate(
      `/${RoutePaths.CAMPAIGN}/${item?.campaign_uuid}/${RoutePaths.STRATEGY}/${item?.uuid}/${RoutePaths.EDIT}?advertiser_id=${item?.advertiser_uuid}`
    );
  }

  function onClickMenu(actionIndex, item) {
    if (actionIndex === 2) {
      setOpenDialog(true);
      setCurrentStrategy(item);

      // Edit strategry
    } else if (actionIndex === 0) {
      navigate(
        `/${RoutePaths.CAMPAIGN}/${item?.campaign_uuid}/${RoutePaths.STRATEGY}/${item?.uuid}/${RoutePaths.EDIT}?advertiser_id=${item?.advertiser_uuid}`
      );
    }
    /*    else {
      navigate(
        `/${RoutePaths.CAMPAIGN}/${item?.campaign_uuid}/${RoutePaths.STRATEGY}/${item?.uuid}?advertiser_id=${item?.advertiser_uuid}`
      );
    }*/
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
      ShowToast.error(<ApiError apiError={err || 'Fail to delete strategy'} />);
    } finally {
      setIsDeleting(false);
      setOpenDialog(false);
    }
  }

  return (
    <>
      <StrategyListStyled>
        {isLoading && <LoadingIndicator />}
        {strategies?.length > 0 ? (
          <List
            data={strategies || []}
            columns={columns}
            showAction
            actions={['Edit', 'Delete']}
            handleAction={onClickMenu}
            handleClickItem={onClickItem}
          />
        ) : (
          <NoDataAvailable message="No Strategy" />
        )}

        <CustomPagination
          currentPage={currentPage}
          totalCount={paginationInfo?.totalItems}
          onPageChange={(evt, page) => onPageChange(evt, page)}
          disabled={isPreviousData}
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
